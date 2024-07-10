//HomePage.js

import React, { useState } from 'react'
import { TypeAnimation } from 'react-type-animation'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import BallCanvas from './technologies/TechnoBall'


const technologies = Array(16).fill(
    {
        name: 'Python',
        icon: '/static/images/python1.png',
    }
)

const technologiesVariant = {
    hidden: {
        y: '100vh', // Offscreen below
        opacity: 0
    },
    visible: {
        y: 0, // Slide up to its position
        opacity: 1,
        transition: {
            duration: 1.5, // Adjust duration as needed
            ease: 'easeInOut' // Adjust easing as needed
        }
    }
}


const HomePage = () => {
    const [displayML, setDisplayML] = useState(false)
    const [displayTechnologies, setDisplayTechnologies] = useState(false)

    return (

        <div className="homepage">
            <div style={{
                backgroundImage: `url(/static/images/alka0.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100%',
                width: '100%',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: -1,
                opacity: 0.25
            }}>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
            }}>
                <div className="card w-1/2 h-1/3 bg-base-100 shadow-xl opacity-75 mt-96" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div className="card-body">
                        <h2 className="card-title justify-center mt-5">
                            <TypeAnimation
                                sequence={['Mahamadou ABOUBACAR', 1000, () => setDisplayML(true)]}
                                speed={50}
                                style={{ fontSize: '1.5em' }}
                                cursor={false}
                            />
                        </h2>
                        {
                            displayML &&
                            <h3 className="card-title justify-center mt-5">
                                <TypeAnimation
                                    sequence={['Data Scientist (Computer Vision) | Data Engineer', 1000, () => setDisplayTechnologies(true)]}
                                    speed={50}
                                    style={{ fontSize: '1.10em' }}
                                    cursor={false}
                                />
                            </h3>
                        }
                    </div>
                    <div className="flex w-full pb-5 justify-center" id="links" style={{ padding: '1rem' }}>
                        <a href='https://github.com/AlkaSaliss' rel="noopener noreferrer" target='_blank'>
                            <div className="grid w-24 h-24  card bg-base-300 rounded-box place-items-center">
                                <Icon icon="mdi:github" style={{ fontSize: '3.5em' }} />
                            </div>
                        </a>
                        <div className="divider divider-horizontal mx-10"></div>
                        <a href='https://www.linkedin.com/in/alkai' rel="noopener noreferrer" target='_blank'>
                            <div className="grid w-24 h-24  card bg-base-300 rounded-box place-items-center">
                                <Icon icon="mdi:linkedin" style={{ fontSize: '3.5em' }} />
                            </div>
                        </a>
                        <div className="divider divider-horizontal mx-10"></div>
                        <a href='https://stackoverflow.com/users/7437524/alka' rel="noopener noreferrer" target='_blank'>
                            <div className="grid w-24 h-24  card bg-base-300 rounded-box place-items-center">
                                <Icon icon="devicon-plain:stackoverflow-wordmark" style={{ fontSize: '3.5em' }} />
                            </div>
                        </a>
                    </div>
                </div>
                {
                    displayTechnologies &&
                    <>
                        <motion.div variants={technologiesVariant} initial="hidden" animate="visible">
                            <div className="card-title justify-center mt-16 text-2xl">
                                I work with following Technologies :
                            </div>
                            <div className="grid grid-cols-8 gap-4">
                                {technologies.map((technology, idx) => (
                                    <div className="w-28 h-28" key={`${technology.name}-${idx}` }>
                                        <BallCanvas icon={technology.icon} />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </>
                }

            </div>
        </div>
    )
}

export default HomePage
