python /home/alka/Documents/alkasalissou.tech/src/ml_model_training_scripts/train_fer.py \
    --path_train_csv /home/alka/Documents/alkasalissou.tech/src/ml_model_training_scripts/fer2013.csv \
    --batch_size 256 \
    --input_size 48 \
    --backbone_name mobilenetv4_hybrid_medium.e500_r224_in1k \
    --lr_head 1e-3 \
    --lr_backbone 1e-5 \
    --finetune_backbone \
    --balance_classes \
    --epochs 500 \
    --output_folder /home/alka/Documents/alkasalissou.tech/src/ml_model_training_scripts/output


python /home/alka/Documents/alkasalissou.tech/src/ml_model_training_scripts/train_fer.py \
    --path_train_csv /home/alka/Documents/alkasalissou.tech/src/ml_model_training_scripts/fer2013.csv \
    --batch_size 256 \
    --input_size 48 \
    --backbone_name mobilenetv4_hybrid_medium.e500_r224_in1k \
    --lr_head 1e-3 \
    --lr_backbone 1e-5 \
    --finetune_backbone \
    --epochs 500 \
    --output_folder /home/alka/Documents/alkasalissou.tech/src/ml_model_training_scripts/output


python /home/alka/Documents/alkasalissou.tech/src/ml_model_training_scripts/train_fer.py \
    --path_train_csv /home/alka/Documents/alkasalissou.tech/src/ml_model_training_scripts/fer2013.csv \
    --batch_size 256 \
    --input_size 128 \
    --backbone_name mobilenetv4_hybrid_medium.e500_r224_in1k \
    --lr_head 1e-3 \
    --lr_backbone 1e-5 \
    --finetune_backbone \
    --balance_classes \
    --epochs 500 \
    --output_folder /home/alka/Documents/alkasalissou.tech/src/ml_model_training_scripts/output


python /home/alka/Documents/alkasalissou.tech/src/ml_model_training_scripts/train_fer.py \
    --path_train_csv /home/alka/Documents/alkasalissou.tech/src/ml_model_training_scripts/fer2013.csv \
    --batch_size 256 \
    --input_size 128 \
    --backbone_name mobilenetv4_hybrid_medium.e500_r224_in1k \
    --lr_head 1e-3 \
    --lr_backbone 1e-5 \
    --finetune_backbone \
    --epochs 500 \
    --output_folder /home/alka/Documents/alkasalissou.tech/src/ml_model_training_scripts/output