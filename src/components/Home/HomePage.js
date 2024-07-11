//HomePage.js

import React, { useState } from 'react'
import { TypeAnimation } from 'react-type-animation'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import BallCanvas from './technologies/TechnoBall'


const main_technologies = [
    {
        name: 'python',
        icon: '/static/images/technos/python.png',
    },
    {
        name: 'linux',
        icon: '/static/images/technos/linux.png',
    },
    {
        name: 'git',
        icon: '/static/images/technos/git.png',
    },
    {
        name: 'sql',
        icon: '/static/images/technos/sql.png',
    },
    {
        name: 'aws',
        icon: '/static/images/technos/aws.png',
    },
    {
        name: 'docker',
        icon: '/static/images/technos/docker.png',
    },
    {
        name: 'scikitlearn',
        icon: '/static/images/technos/scikitlearn.png',
    },
    {
        name: 'pytorch',
        icon: '/static/images/technos/pytorch.png',
    },
]

const mobile_web_technologies = [
    {
        name: 'cpp',
        icon: '/static/images/technos/cpp.png',
    },
    {
        name: 'rust',
        icon: '/static/images/technos/rust.png',
    },
    {
        name: 'react',
        icon: '/static/images/technos/react.png',
    },
    {
        name: 'reactnative',
        icon: '/static/images/technos/reactnative.png',
    },
    {
        name: 'kotlin',
        icon: '/static/images/technos/kotlin.png',
    },
    {
        name: 'onnx',
        icon: '/static/images/technos/onnx.png',
    },
    {
        name: 'opencv',
        icon: '/static/images/technos/opencv.png',
    },
]

const technoUp = {
    hidden: {
        y: '100vh',
        opacity: 0
    }
}

const technoDown = {
    hidden: {
        y: '-100vh',
        opacity: 0
    }
}

const technologiesVariant = {
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 1.5,
            ease: 'easeInOut'
        }
    }
}


const HomePage = () => {
    const [displayML, setDisplayML] = useState(false)
    const [displayRole, setDisplayRole] = useState(false)
    const [displayTechnologies, setDisplayTechnologies] = useState(false)

    return (

        <div className="homepage">
            <div style={{
                backgroundImage: `url(/static/images/alka7.png)`,
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
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
            }}>

                {
                    displayTechnologies &&
                    <div className='justify-center w-2/5 mt-48 pl-4'>
                        <motion.div variants={{ ...technoUp, ...technologiesVariant }} initial="hidden" animate="visible">
                            <div className="card-title justify-center my-6 text-base text-center">
                                I work with following Technos / Tools :
                            </div>
                            <div className="grid grid-cols-4 gap-4 place-items-center">
                                {main_technologies.map((technology, idx) => (
                                    <div className="w-28 h-28" key={`${technology.name}-${idx}`}>
                                        <BallCanvas icon={technology.icon} />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                }


                <div className="card w-1/2 h-1/3 bg-base-100 shadow-xl opacity-75 mt-48 mx-20" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div className="card-body">
                        <h2 className="card-title justify-center text-center">
                            <TypeAnimation
                                sequence={['Mahamadou ABOUBACAR', 1000, () => setDisplayRole(true)]}
                                speed={75}
                                style={{ fontSize: '1.10em' }}
                                cursor={false}
                            />
                        </h2>
                        {
                            displayRole &&
                            <h3 className="card-title justify-center text-center">
                                <TypeAnimation
                                    sequence={['Senior Freelance', 1000, () => setDisplayML(true)]}
                                    speed={75}
                                    style={{ fontSize: '1.05em' }}
                                    cursor={false}
                                />
                            </h3>
                        }
                        {
                            displayML &&
                            <h3 className="card-title justify-center text-center">
                                <TypeAnimation
                                    sequence={['Data Engineering | Data Science', 1000, () => setDisplayTechnologies(true)]}
                                    speed={75}
                                    style={{ fontSize: '1.0em' }}
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
                    <div className='justify-center w-2/5 mt-48 pr-4'>
                        <motion.div variants={{ ...technoDown, ...technologiesVariant }} initial="hidden" animate="visible">
                            <div className="card-title justify-center mt-8 text-base text-center">
                                Because I'm fan of on-device machine learning, I'm also familiar with web/mobile dev technologies and also some high performance languages:
                            </div>
                            <div className="grid grid-cols-4 gap-4 place-items-center">
                                {mobile_web_technologies.map((technology, idx) => (
                                    <div className="w-28 h-28 place-items-center" key={`${technology.name}-${idx}`}>
                                        <BallCanvas icon={technology.icon} />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                }

            </div>
        </div>
    )
}

export default HomePage
