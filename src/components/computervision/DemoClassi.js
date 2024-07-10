import React, { useState, useRef } from 'react'
import Webcam from 'react-webcam'






const DemoClassi = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    const webcamRef = useRef(null)
    const canvasRef = useRef(null)
    const inputImageRef = useRef(null)

    const handlePlayClick = () => setIsPlaying(!isPlaying)

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