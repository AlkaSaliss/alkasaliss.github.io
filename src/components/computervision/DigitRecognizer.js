import React, { useRef, useEffect, useState } from 'react'
import { Tensor, InferenceSession } from "onnxjs"
import ndarray from 'ndarray'
import ops from 'ndarray-ops'
import BarChart from './charts/BarChart'


var session = new InferenceSession({ backendHint: 'webgl' })
const MODEL_URL = "/static/models/mnist.onnx"

const softMaxFunc = (ar) => {
  const denom = ar.map(x => Math.exp(x)).reduce((a, b) => a + b)
  return ar.map(x => Math.exp(x) / denom)
}

const DigitRecognizer = () => {
  const canvasRef = useRef(null)
  const canvasRefScaled = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const defaultBarData = Array.from({ length: 10 }, (_, i) => ({
    pred: 0.1, category: i.toString(), key: i
  }))
  const [barData, setBarData] = useState(defaultBarData)
  const barColumns = { xColumn: 'pred', yColumn: 'category' }
  const barKey = 'key'
  const barDimensions = {
    width: 500, height: 400, marginBottom: 20,
    marginTop: 20, marginRight: 20, marginLeft: 20
  }
  const barTitle = 'Predicted Digit'

  const loadONNXModel = async () => {
    console.log("loading model.........")
    await session.loadModel(MODEL_URL)
    console.log("model loaded.........")
  }

  useEffect(() => {
    const dimensions = {
      width: 340,
      height: 340,
      marginTop: 20,
      marginBottom: 20,
      marginRight: 20,
      marginLeft: 20
    }
    const innerWidth = dimensions.width - dimensions.marginLeft - dimensions.marginRight
    const innerHeight = dimensions.height - dimensions.marginBottom - dimensions.marginTop

    const canvas = canvasRef.current
    canvas.width = innerWidth * 3
    canvas.height = innerHeight * 3

    canvas.style.width = `${innerWidth}px`
    canvas.style.height = `${innerHeight}px`

    const canvasContext = canvas.getContext('2d')
    canvasContext.scale(3, 3)
    canvasContext.lineCap = 'round'
    canvasContext.strokeStyle = 'black'
    canvasContext.lineWidth = 20
    contextRef.current = canvasContext
    console.log("before load")

    loadONNXModel()
    return () => {
      session = new InferenceSession({ backendHint: 'webgl' })
    }
  }, [])

  const handlePredict = async () => {
    const canvasContextScaled = canvasRefScaled.current.getContext('2d')
    canvasContextScaled.clearRect(0, 0, contextRef.current.canvas.width, contextRef.current.canvas.height)
    canvasContextScaled.drawImage(document.getElementById('input-img-canvas'), 0, 0, contextRef.current.canvas.width, contextRef.current.canvas.height, 0, 0, 28, 28)
    const imgScaled = canvasContextScaled.getImageData(0, 0, canvasContextScaled.canvas.width, canvasContextScaled.canvas.height)
    const { data, width, height } = imgScaled

    const imgArray = ndarray(new Float32Array(data), [width, height, 4])
    const inputArray = ndarray(new Float32Array(width * height * 1), [1, 1, width, height])
    ops.assign(inputArray.pick(0, 0, null, null), imgArray.pick(null, null, 3))
    ops.divseq(inputArray, 255)
    ops.subseq(inputArray, 0.1307)
    ops.divseq(inputArray, 0.3081)

    const imgTensor = [
      new Tensor(inputArray.data, 'float32', [1, 1, width, height])
    ]

    const outputMap = await session.run(imgTensor)
    const outputTensor = outputMap.values().next().value
    const predProba = [...softMaxFunc(outputTensor.data)]
    const predData = predProba.map((p, idx) => ({ pred: p, category: idx.toString(), key: idx }))
    setBarData(predData)
  }

  const handleClear = () => {
    if (contextRef.current) {
      contextRef.current.clearRect(0, 0, contextRef.current.canvas.width, contextRef.current.canvas.height)
    }
    setBarData(defaultBarData)
  }

  const drawingStart = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }

  const drawingEnd = () => {
    contextRef.current.closePath()
    setIsDrawing(false)
    handlePredict()
  }

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return
    const { offsetX, offsetY } = nativeEvent
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
  }

  return (
    <div className="flex flex-col items-center p-4 space-y-8">
      <div className="text-center mb-4">
        <h2 className="text-lg font-semibold">
          Digit Recognition: Draw a digit (from 0 to 9) and an embedded AI model will predict the drawn digit
        </h2>
      </div>
      <div className="flex justify-center space-x-8">
        <div className="flex flex-col items-center  mx-36 mt-10">
          <canvas
            id="input-img-canvas"
            className="border border-gray-300 rounded-lg"
            onMouseDown={drawingStart}
            onMouseUp={drawingEnd}
            onMouseMove={draw}
            ref={canvasRef}
          />
          <canvas
            height="28"
            width="28"
            style={{ display: 'none' }}
            ref={canvasRefScaled}
          />
          <div className="flex justify-center mt-6">
            <button
              className="btn"
              onClick={handleClear}
            >
              Clear Drawing
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <BarChart
            data={barData}
            columns={barColumns}
            dimensions={barDimensions}
            title={barTitle}
            id={barKey}
          />
        </div>
      </div>

    </div>
  )
}

export default DigitRecognizer