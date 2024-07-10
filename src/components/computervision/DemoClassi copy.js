import React, { useState, useEffect, useRef } from 'react'
import Webcam from 'react-webcam'
import * as tf_face_detector from '@tensorflow-models/face-landmarks-detection'
import '@tensorflow/tfjs-core'
import '@tensorflow/tfjs-backend-webgl'
import '@mediapipe/face_mesh'
import { InferenceSession, Tensor } from "onnxjs"
import ndarray from 'ndarray'
import ops from 'ndarray-ops'


const MODEL_URL_FER = "/static/models/FER_mobilenetv4.onnx"
const MODEL_URL_RAG = "/static/models/rag.onnx"

const faceModelName = tf_face_detector.SupportedModels.MediaPipeFaceMesh
const detectorConfig = {
    runtime: 'tfjs',
}

const LABEL_FER = {
    0: 'Angry',
    1: 'Disgust',
    2: 'Fear',
    3: 'Happy',
    4: 'Sad',
    5: 'Surprise',
    6: 'Neutral'
}
const LABEL_GENDER = { 0: 'Man', 1: 'Woman' }
const LABEL_RACE = { 0: 'White', 1: 'Black', 2: 'Asian', 3: 'Indian', 4: 'Other' }

// loading model
const loadONNXModel = async (session_fer, session_rag) => {
    await session_fer.loadModel(MODEL_URL_FER)
    await session_rag.loadModel(MODEL_URL_RAG)
}

const DemoClassi = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    const webcamRef = useRef(null)
    const canvasRef = useRef(null)
    const inputImageRef = useRef(null)
    const WIDTH = 640
    const HEIGHT = 450

    const sessionFerRef = useRef(new InferenceSession({ backendHint: 'webgl' }))
    const sessionRagRef = useRef(new InferenceSession({ backendHint: 'webgl' }))

    const handlePlayClick = () => setIsPlaying(!isPlaying)

    // face detection function
    const detectFace = async (faceModel) => {
        // console.log("detectFace function called...")
        if (typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            typeof canvasRef.current !== "undefined" &&
            inputImageRef.current !== null &&
            typeof inputImageRef.current !== "undefined" &&
            canvasRef.current !== null &&
            webcamRef.current.video.readyState === 4 &&
            isPlaying
        ) {
            console.log("detectFace running...")
            const video = webcamRef.current.video
            const videoWidth = webcamRef.current.video.videoWidth
            const videoHeight = webcamRef.current.video.videoHeight
            // Set video width/height
            webcamRef.current.video.width = videoWidth
            webcamRef.current.video.height = videoHeight
            // Set canvas width/height
            canvasRef.current.width = videoWidth
            canvasRef.current.height = videoHeight
            const ctx = canvasRef.current.getContext('2d')
            // detect faces
            const faces = await faceModel.estimateFaces(video)
            // draw faces
            requestAnimationFrame(() => drawFace(ctx, faces, video))
            console.log("detectFace ran...")
        }
    }

    // function to draw face bounding box on canvas
    const drawFace = async (ctx, faces, video) => {
        if (faces.length > 0) {
            for (let face of faces) {
                const predictions = await handlePredictDemoclassi(video, face)

                ctx.beginPath()
                ctx.strokeStyle = "#45ff6a"
                ctx.lineWidth = 5

                ctx.moveTo(face.box.xMin, face.box.yMin)
                ctx.lineTo(face.box.xMax, face.box.yMin)
                ctx.lineTo(face.box.xMax, face.box.yMax)
                ctx.lineTo(face.box.xMin, face.box.yMax)
                ctx.lineTo(face.box.xMin, face.box.yMin)

                ctx.scale(-1, 1)
                const [fontSize, fontFamily, fontColor, textAlign, textBaseline] = [1.25, "cursive", "#45ff6a", "right", "top"]
                ctx.font = `${fontSize}em ${fontFamily}`
                ctx.textAlign = textAlign
                ctx.textBaseline = textBaseline
                ctx.fillStyle = fontColor
                ctx.fillText(predictions, -1.15 * face.box.xMin, face.box.yMin - 20)
                ctx.stroke()
                ctx.closePath()
            }
        }
    }

    const getImgScaled = (ctxScaled, targetWidth, targetHeight, srcVideo, sx, sy, faceWidth, faceHeight) => {
        ctxScaled.clearRect(0, 0, targetWidth, targetHeight)
        ctxScaled.drawImage(srcVideo, sx, sy, faceWidth, faceHeight, 0, 0, targetWidth, targetHeight)
        const imgScaled = ctxScaled.getImageData(0, 0, ctxScaled.canvas.width, ctxScaled.canvas.height)
        const { data, width, height } = imgScaled
        const imgArray = ndarray(new Float32Array(data), [width, height, 4])
        const nChannels = 3
        const inputArray = ndarray(new Float32Array(width * height * nChannels), [1, nChannels, width, height])
        for (let i = 0; i < nChannels; i++) {
            ops.assign(inputArray.pick(0, i, null, null), imgArray.pick(null, null, i))
        }
        ops.divseq(inputArray, 255)
        return inputArray
    }

    const handlePredictDemoclassi = async (srcVideo, face) => {
        if (typeof inputImageRef.current !== "undefined" &&
            inputImageRef.current !== null) {
            const faceWidth = face.box.width
            const faceHeight = face.box.height
            const faceX = face.box.xMin
            const faceY = face.box.yMin

            const [targetWidth, targetHeight] = [128, 128]
            const ctxInputImage = inputImageRef.current.getContext("2d")
            const imgScaled = getImgScaled(ctxInputImage, targetWidth, targetHeight, srcVideo, faceX, faceY, faceWidth, faceHeight)

            const imgTensor = [
                new Tensor(imgScaled.data, 'float32', [1, 3, targetWidth, targetHeight])
            ]

            const outputMapFer = await sessionFerRef.current.run(imgTensor)
            const outputMapRag = await sessionRagRef.current.run(imgTensor)

            let outputTensorFer = ops.argmax(ndarray(new Float32Array(outputMapFer.values().next().value.data)))
            let outputTensorAge = outputMapRag.get("age").data[0]
            let outputTensorGender = ops.argmax(ndarray(new Float32Array(outputMapRag.get("gender").data)))
            let outputTensorRace = ops.argmax(ndarray(new Float32Array(outputMapRag.get("race").data)))
            outputTensorFer = LABEL_FER[outputTensorFer]
            outputTensorGender = LABEL_GENDER[outputTensorGender]
            outputTensorRace = LABEL_RACE[outputTensorRace]
            const finalOutput = `${outputTensorFer} ${outputTensorRace} ${outputTensorGender} --- Age ${outputTensorAge.toFixed(0)}`
            console.log("Predicted: ", finalOutput)
            return finalOutput

        }
        return "Predicting ..."
    }

    useEffect(() => {

        let faceModel
        let intervalId

        const runDetection = async () => {
            faceModel = await tf_face_detector.createDetector(faceModelName, detectorConfig)
            setInterval(() => detectFace(faceModel), 100)
            if (isPlaying) {
                intervalId = setInterval(() => detectFace(faceModel), 100)
            }
        }

        const initializeModels = async () => {
            await loadONNXModel(sessionFerRef.current, sessionRagRef.current)
        }

        initializeModels()
        runDetection()

        return () => {
            if (intervalId) clearInterval(intervalId)
            // reinitialize models otherwise exception raised : already initialized
            sessionFerRef.current = new InferenceSession({ backendHint: 'webgl' })
            sessionRagRef.current = new InferenceSession({ backendHint: 'webgl' })
        }

    }, [isPlaying])

    return (
        <div className='grid grid-cols-12 gap-4 p-4'>
            <div className='col-span-8 flex justify-center'>
                {isPlaying ?
                    <div className='relative inline-block'>
                        <Webcam
                            ref={webcamRef}
                            mirrored={true}
                            audio={false}
                            forceScreenshotSourceSize={true}
                            screenshotFormat="image/jpeg"
                            screenshotQuality={1.0}
                            className='inset-0 w-full h-full'
                            style={{ zIndex: 9 }}
                        />
                        <canvas
                            ref={canvasRef}
                            className='absolute inset-0 w-full h-full transform scale-x-[-1]'
                            style={{ zIndex: 9 }}
                        />
                        <canvas
                            ref={inputImageRef}
                            height="128"
                            width="128"
                            className='hidden'
                        />
                    </div>
                    :
                    <div className="flex items-center justify-center h-full">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                }
            </div>
            <div className='col-span-4 flex flex-col items-center'>
                <div className="alert alert-info">
                    <div>
                        <span>If camera not showing after clicking the button, make sure you access the website via <strong>https</strong></span>
                    </div>
                </div>
                <p className='text-lg text-center my-12'>
                    If you're not scared of hackers <span role="img" aria-label="desc">👨🏿‍💻</span>, push the start button & let the MaGiC happen <span role="img" aria-label="desc">🧠</span>.
                    <br />(Don't worry the model is embedded in your browser! So No data sent anywhere! Yeah We are RGPD compliant ᕙ(▀̿̿Ĺ̯̿̿▀̿ ̿) ᕗ)
                </p>
            </div>
            <div className='col-span-12 flex justify-center my-12'>
                <button
                    className="btn btn-primary"
                    onClick={handlePlayClick}
                >
                    {isPlaying ? 'Pause Camera' : 'Start Face Detection'}
                </button>
            </div>
        </div>
    )
}

export default DemoClassi