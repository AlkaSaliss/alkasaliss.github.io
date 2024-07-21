import React, { useState, useEffect } from "react"
import CreatableSelect from "react-select/creatable"
import { pipeline, env } from "@xenova/transformers"
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts"

env.allowLocalModels = false

const components = {
  DropdownIndicator: null,
}

const createOption = (label) => ({
  label,
  value: label,
})

const sampleClassificationData = [
  {
    inputText: "The protein molecules folded into complex shapes.",
    labels: ["Science", "Technology", "Art", "History"], // Correct: Science, Others: Confounding
  },
  {
    inputText: "The guitarist played a melancholic tune on his instrument.",
    labels: ["Music", "Sports", "Travel", "Politics"], // Correct: Music, Others: Confounding
  },
  {
    inputText: "She baked a delicious chocolate cake from scratch.",
    labels: ["Food", "Fashion", "Business", "Education"], // Correct: Food, Others: Confounding
  },
  {
    inputText: "The athlete trained rigorously for the upcoming marathon.",
    labels: ["Sports", "Medicine", "Technology", "Entertainment"], // Correct: Sports, Others: Confounding
  },
  {
    inputText:
      "The Louvre museum houses a vast collection of art masterpieces.",
    labels: ["Art", "History", "Science", "Travel"], // Correct: Art, Others: Confounding
  },
  {
    inputText: "The company announced a new line of eco-friendly products.",
    labels: ["Business", "Technology", "Fashion", "Environment"], // Correct: Business, Others: Confounding
  },
  {
    inputText: "The documentary explored the life of a marine biologist.",
    labels: ["Science", "Education", "Entertainment", "Travel"], // Correct: Science, Others: Confounding
  },
  {
    inputText: "The upcoming election has generated a lot of political debate.",
    labels: ["Politics", "Business", "Technology", "Social Media"], // Correct: Politics, Others: Confounding
  },
  {
    inputText:
      "The fashion show showcased the latest trends in clothing design.",
    labels: ["Fashion", "Entertainment", "Art", "Business"], // Correct: Fashion, Others: Confounding
  },
  {
    inputText:
      "The hospital implemented new protocols to improve patient care.",
    labels: ["Medicine", "Education", "Technology", "Social Media"], // Correct: Medicine, Others: Confounding
  },
]

const TextClassification = () => {
  const [inputValue, setInputValue] = useState("")
  const [classificationLabels, setClassificationLabels] = useState([])
  const [classificationText, setClassificationText] = useState("")
  const [classificationResult, setClassificationResult] = useState(null)
  const [classifier, setClassifier] = useState(null)

  useEffect(() => {
    const loadModel = async () => {
      const loadedClassifier = await pipeline(
        "zero-shot-classification",
        "Xenova/mobilebert-uncased-mnli"
      )
      setClassifier(() => loadedClassifier)
    }

    loadModel()
  }, [])

  const handleKeyDown = (event) => {
    if (!inputValue) return
    switch (event.key) {
      case "Enter":
      case "Tab":
        setClassificationLabels((prev) => [...prev, createOption(inputValue)])
        setInputValue("")
        event.preventDefault()
        break
      default:
        break
    }
  }

  const handleClassify = async () => {
    if (!classifier) {
      alert("Model is still loading, please wait...")
      return
    }

    if (!classificationText || !classificationLabels) {
      alert("Please enter text and labels")
      return
    }

    const labelValues = classificationLabels.map((label) => label.value)
    const output = await classifier(classificationText, labelValues)
    setClassificationResult(output)
  }

  const setExample1 = () => {
    setClassificationText(
      "The restaurant had a cozy atmosphere and the food was delicious, even though the service was a little bit slow."
    )
    setClassificationLabels([
      createOption("positive"),
      createOption("neutral"),
      createOption("negative"),
    ])
  }

  const setRandomExample = () => {
    const randomElement =
      sampleClassificationData[
        Math.floor(Math.random() * sampleClassificationData.length)
      ]
    setClassificationText(randomElement.inputText)
    setClassificationLabels([])
    randomElement.labels.forEach((label) => {
      setClassificationLabels((prev) => [...prev, createOption(label)])
    })
  }

  return (
    <div className="container mx-auto p-4 flex flex-col items-center text-center">
      <p className="mb-4 w-2/3">
        This page provide zero-shot text classification using a model embedded
        directly in browser. Zero-shot classification allows you to provide an
        input text and a set of candidate categories, and the model will return
        the most likely category for the input text.
        <br />
        Enter the text you want to classify and add labels:
      </p>
      <div className="flex mb-4 w-1/2">
        <textarea
          className="textarea textarea-bordered w-full mt-1"
          rows={4}
          value={classificationText}
          onChange={(e) => setClassificationText(e.target.value)}
          placeholder="Type your text here..."
        />
        <div className="ml-4 flex flex-col space-y-2">
          <button className="btn" onClick={setExample1}>
            Example 1 (sentiment analysis)
          </button>
          <button className="btn" onClick={setRandomExample}>
            Random Example
          </button>
        </div>
      </div>
      <div className="mb-4 w-1/2">
        <label className="block text-sm font-medium text-gray-300">
          Labels
        </label>
        <CreatableSelect
          components={components}
          inputValue={inputValue}
          isClearable
          isMulti
          menuIsOpen={false}
          onChange={(newValue) => setClassificationLabels(newValue)}
          onInputChange={(newValue) => setInputValue(newValue)}
          onKeyDown={handleKeyDown}
          placeholder="Type and press enter to add candidate label..."
          value={classificationLabels}
          className="w-full"
        />
      </div>
      <button className="btn border-green-200" onClick={handleClassify}>
        Classify
      </button>
      {classificationResult && (
        <div className="mt-4 w-1/3">
          <h2 className="text-xl font-bold mt-8">Classification Results</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={classificationResult.labels.map((label, index) => ({
                label,
                score: classificationResult.scores[index],
              }))}
              margin={{
                top: 10,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="label" />
              <Tooltip />
              <Bar dataKey="score" fill="#cbd5e1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

export default TextClassification
