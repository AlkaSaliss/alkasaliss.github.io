import itertools
import pandas as pd
from sklearn.metrics import classification_report, confusion_matrix
import torch
import torchvision
import timm
import lightning as L
import os
import pathlib
from datetime import datetime
import json

import numpy as np
import torch.nn as nn
import torch.optim as optim
from tqdm.auto import tqdm
import shutil
import multiprocessing as mp
import argparse
from collections import Counter
import matplotlib.pyplot as plt
from PIL import Image
from torchmetrics.classification import MulticlassAccuracy


def empty_cuda_cache(*args):
    print("***** Emptying CUDA cache...")
    import gc
    for arg in args:
        del arg
    gc.collect()
    if torch.cuda.is_available():
        torch.cuda.empty_cache()
    print("***** CUDA cache emptied!")


def get_image_from_pixels_list(pixels):
    return Image.fromarray(np.asarray(pixels.split()).astype(np.uint8).reshape(48, 48))


def plot_confusion_matrix(y_true, y_pred, output_path, title='Confusion matrix', labels_=None, target_names=None, normalize=False):

    print(classification_report(y_true, y_pred, labels=labels_, target_names=target_names))

    cm = confusion_matrix(y_true, y_pred)

    accuracy = np.trace(cm) / float(np.sum(cm))
    misclass = 1 - accuracy

    cmap = plt.get_cmap('Blues')

    fig = plt.figure(figsize=(8, 6))
    plt.imshow(cm, interpolation='nearest', cmap=cmap)
    plt.title(title)
    plt.colorbar()

    tick_marks = np.arange(len(target_names))
    plt.xticks(tick_marks, target_names, rotation=45)
    plt.yticks(tick_marks, target_names)

    if normalize:
        cm = cm.astype('float') / cm.sum(axis=1)[:, np.newaxis]

    thresh = cm.max() / 1.5 if normalize else cm.max() / 2
    for i, j in itertools.product(range(cm.shape[0]), range(cm.shape[1])):
        if normalize:
            plt.text(j, i, f"{cm[i, j]:.4f}",
                     horizontalalignment="center",
                     color="white" if cm[i, j] > thresh else "black")
        else:
            plt.text(j, i, f"{cm[i, j]}",
                     horizontalalignment="center",
                     color="white" if cm[i, j] > thresh else "black")

    plt.tight_layout()
    plt.ylabel('True label')
    plt.xlabel(f'Predicted label\naccuracy={accuracy:.4f}; misclass={misclass:.4f}')
    plt.savefig(output_path)
    plt.close(fig)


class TimmClassifier(L.LightningModule):
    
    def __init__(
        self,
        backbone_name="mobilenetv4_hybrid_medium.e500_r224_in1k",
        input_size=48,
        num_classes=7,
        lr_head=1e-4,
        lr_backbone=1e-5,
        finetune_backbone=False,
        class_weights=None,
        **kwargs
    ):
        super().__init__()
        self.input_size = input_size
        self.finetune_backbone = finetune_backbone

        self.backbone = timm.create_model(backbone_name, pretrained=True, num_classes=0, in_chans=1)
        if not self.finetune_backbone:
            self.backbone.eval()
            for p in self.backbone.parameters():
                p.requires_grad = False

        # get features dim
        is_training = self.training
        self.backbone.eval()
        with torch.no_grad():
            num_ftrs = self.backbone(torch.randn(1, 1, input_size, input_size)).shape[-1]
        self.backbone.train(is_training)
        
        self.classifier = nn.Sequential(
            nn.ReLU(),
            nn.Linear(num_ftrs, num_classes),
        )
        self.criterion = nn.CrossEntropyLoss(weight=class_weights)
        self.train_accuracy = MulticlassAccuracy(num_classes=num_classes)
        self.val_accuracy = MulticlassAccuracy(num_classes=num_classes)
        self.lr_head = lr_head
        self.lr_backbone = lr_backbone
    
    def get_data_cfg(self):
        return timm.data.resolve_data_config(self.backbone.pretrained_cfg)

    def forward(self, x):
        return self.classifier(self.backbone(x))
    
    @torch.no_grad()
    def predict(self, x):
        self.eval()
        return self.forward(x)
    
    def training_step(self, batch, batch_idx):
        x, y = batch
        x = self.forward(x)
        loss = self.criterion(x, y)
        self.train_accuracy(x, y)
        self.log("train_loss", loss, prog_bar=True)
        self.log('train_accuracy', self.train_accuracy, on_step=True, on_epoch=False, prog_bar=True)
        return loss
    
    def validation_step(self, batch, batch_idx):
        x, y = batch
        x = self.forward(x)
        loss = self.criterion(x, y)
        self.val_accuracy(x, y)
        self.log("val_loss", loss, prog_bar=True)
        self.log('val_accuracy', self.val_accuracy, on_step=False, on_epoch=True, prog_bar=True)
        return loss

    def configure_optimizers(self):
        params = [{'params': self.classifier.parameters(), "lr": self.lr_head}]
        if self.finetune_backbone:
            params.append({'params': self.backbone.parameters(), "lr": self.lr_backbone})
        optimizer = optim.AdamW(params, weight_decay=5e-2)
        return optimizer


class ClassificationDataset(torch.utils.data.Dataset):

    def __init__(self, df, image_size=48, dataset_type="train"):
        self.dataset_type = dataset_type
        with mp.Pool() as pool:
            list_images = pool.map(get_image_from_pixels_list, tqdm(df.pixels))
        self.list_images = list_images

        if dataset_type == "train":
            transforms = [
                torchvision.transforms.Resize(image_size),
                torchvision.transforms.RandomHorizontalFlip(),
                torchvision.transforms.ToTensor(),
            ]
        else:
            transforms = [
                torchvision.transforms.Resize(image_size),
                torchvision.transforms.ToTensor(),
            ]
        self.transforms = torchvision.transforms.Compose(transforms)
        
        if self.dataset_type in ["train", "val"]:
            self.label = torch.tensor(df["emotion"].values).long()

    def __len__(self):
        return len(self.list_images)

    def __getitem__(self, idx):
        img = self.transforms(self.list_images[idx])
        if self.dataset_type == "test":
            return img
        return img, self.label[idx]


def get_training_dataloaders(df_train, df_val, img_size, batch_size):
    train_dataset = ClassificationDataset(df_train, img_size, dataset_type="train")
    val_dataset = ClassificationDataset(df_val, img_size, dataset_type="val")
    train_loader = torch.utils.data.DataLoader(train_dataset, batch_size=batch_size, shuffle=True, num_workers=8, pin_memory=True)
    val_loader = torch.utils.data.DataLoader(val_dataset, batch_size=batch_size, shuffle=False, num_workers=8, pin_memory=True)
    return train_loader, val_loader


def get_test_dataloader(df, img_size, batch_size):
    dataset = ClassificationDataset(df, img_size, dataset_type="test")
    dataloader = torch.utils.data.DataLoader(dataset, batch_size=batch_size, shuffle=False, num_workers=8, pin_memory=True)
    return dataloader


def get_duration(t1, t2, step="training"):
    duration = (t2 - t1).total_seconds()
    m, s = divmod(duration, 60)
    h, m = divmod(m, 60)
    print(f"Total {step} duration : {int(h)}h - {int(m)}mn - {int(s)}s")
    return int(duration)


def train_and_eval_model(
    df_train,
    batch_size=16,
    input_size=48,
    num_classes=7,
    backbone_name="mobilenetv4_hybrid_medium.e500_r224_in1k",
    lr_head=1e-4,
    lr_backbone=1e-5,
    finetune_backbone=False,
    balance_classes=False,
    epochs=1,
    output_folder="/home/alka/Documents/alkasalissou.tech/src/ml_model_training_scripts/output",
    **kwargs
):
    training_args = {k: v for k,v in locals().items() if k != "df_train"}

    start_time =  datetime.now()
    start_time_str =  str(start_time).split(".")[0].replace(" ", "_").replace(":", "-")
    random_state = 123
    L.seed_everything(random_state)
    # torch.set_float32_matmul_precision("medium")

    current_file = pathlib.Path(__file__).resolve()
   
    root_folder = os.path.join(output_folder, f"output_{backbone_name}_{start_time_str}")
    os.makedirs(root_folder, exist_ok=True)
    shutil.copy2(current_file, root_folder)
    device = ("cuda" if torch.cuda.is_available() else "cpu")

    train_df, val_df = df_train.query("Usage == 'Training'"), df_train.query("Usage == 'PrivateTest'")

    class_weights = None
    if balance_classes:
        class_counts = Counter(train_df.emotion.tolist())
        num_samples = len(train_df)
        num_classes = len(class_counts)
        class_weights = {cls: num_samples / (num_classes * count) for cls, count in class_counts.items()}
        class_weights = torch.tensor([class_weights[i] for i in range(num_classes)]).float().to(device)

    model = TimmClassifier(
        backbone_name,
        input_size,
        num_classes,
        lr_head,
        lr_backbone,
        finetune_backbone,
        class_weights
    )

    train_loader, val_loader = get_training_dataloaders(
        train_df,
        val_df,
        input_size,
        batch_size,
    )

    ckpt_folder = os.path.join(root_folder, "checkpoints")
    os.makedirs(ckpt_folder, exist_ok=True)
    checkpoint_callback = L.pytorch.callbacks.ModelCheckpoint(
        monitor="val_loss",
        mode="min",
        dirpath=ckpt_folder,
        filename="ckpt-{epoch}-{val_loss:.6f}",
        save_top_k=1,
        save_last=True,
        save_weights_only=True,
        every_n_epochs=1,
    )
    tb_logger = L.pytorch.loggers.TensorBoardLogger(ckpt_folder)

    trainer = L.Trainer(
        default_root_dir=ckpt_folder,
        max_epochs=epochs,
        callbacks=[checkpoint_callback],
        logger=tb_logger,
        accelerator="gpu",
        # precision="16-mixed",
    )
    trainer.fit(model, train_loader, val_loader)

    model.load_state_dict(torch.load(trainer.checkpoint_callback.best_model_path)["state_dict"])
    model.to(device)
    model.eval()

    list_preds = []
    for x, y in tqdm(val_loader):
        x = model.predict(x.to(device)).argmax(dim=1).cpu().numpy()
        list_preds.append(x)
    list_preds = np.concatenate(list_preds)

    plot_confusion_matrix(
        val_df.emotion,
        list_preds,
        os.path.join(root_folder, "confusion_matrix.png"),
        title="Confusion Matrix",
        labels_=val_df.emotion.unique().tolist(),
        target_names=['Angry', 'Disgust', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutral'],
        normalize=True,
    )
    
    end_training_time = datetime.now()

    training_args["training_duration"] = get_duration(start_time, end_training_time, "training")
    training_args["best_validation_loss"] = trainer.checkpoint_callback.best_model_score.cpu().item()

    print("============ Best Validation losses")
    print(training_args["best_validation_loss"])
    print("============ Total duration: ", training_args["training_duration"])

    with open(os.path.join(root_folder, "training_parameters.json"), "w") as f:
        json.dump(training_args, f, indent=4)


if __name__ == "__main__":

    parser = argparse.ArgumentParser(
        description="Train classification model"
    )
    parser.add_argument(
        "--path_train_csv",
        default="/home/alka/Documents/alkasalissou.tech/src/ml_model_training_scripts/fer2013.csv"
    )
    parser.add_argument(
        "--batch_size",
        default=16,
        type=int
    )
    parser.add_argument(
        "--input_size",
        default=48,
        type=int
    )
    parser.add_argument(
        "--backbone_name",
        default="mobilenetv4_hybrid_medium.e500_r224_in1k",
    )
    parser.add_argument(
        "--lr_head",
        default=1e-3,
        type=float
    )
    parser.add_argument(
        "--lr_backbone",
        default=1e-5,
        type=float
    )
    parser.add_argument(
        "--finetune_backbone",
        action="store_true",
    )
    parser.add_argument(
        "--balance_classes",
        action="store_true",
    )
    parser.add_argument(
        "--epochs",
        default=50,
        type=int
    )
    parser.add_argument(
        "--output_folder",
        default="/home/alka/Documents/alkasalissou.tech/src/ml_model_training_scripts/output",
    )


    args = vars(parser.parse_args())
    df_train = pd.read_csv(args["path_train_csv"])

    args["df_train"] = df_train
    train_and_eval_model(**args)