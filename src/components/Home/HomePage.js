//HomePage.js

import React, { useState, useEffect } from 'react'
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
        name: 'html_css',
        icon: '/static/images/technos/html_css.png',
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


const TypedTitle = ({ text, onComplete }) => (
    <h2 className="card-title justify-center text-center">
        <TypeAnimation
            sequence={[text, 1000, onComplete]}
            speed={85}
            style={{ fontSize: '1.10em' }}
            cursor={false}
        />
    </h2>
)

const SocialLinks = () => (
    <div className="flex flex-wrap justify-center pb-5 gap-4">
        <SocialLink href="https://github.com/AlkaSaliss" icon="mdi:github" />
        <SocialLink href="https://www.linkedin.com/in/alkai" icon="mdi:linkedin" />
        <SocialLink href="https://stackoverflow.com/users/7437524/alka" icon="devicon-plain:stackoverflow-wordmark" />
    </div>
)

const SocialLink = ({ href, icon }) => (
    <a href={href} rel="noopener noreferrer" target='_blank'>
        <div className="grid w-16 h-16 md:w-24 md:h-24 card bg-base-300 rounded-box place-items-center">
            <Icon icon={icon} style={{ fontSize: '2em', md: 'fontSize: 3.5em' }} />
        </div>
    </a>
)

const TechnologiesSection = ({ technologies, title, variants }) => (
    <div className='w-full md:w-2/5 mt-8 md:mt-0 px-4'>
        <motion.div variants={{...variants, ...technologiesVariant}} initial="hidden" animate="visible">
            <div className="card-title justify-center my-6 text-base text-center">
                {title}
            </div>
            <div className="grid grid-cols-4 md:grid-cols-4 gap-4 place-items-center">
                {technologies.map((technology, idx) => (
                    <div className="w-16 h-16 md:w-28 md:h-28" key={`${technology.name}-${idx}`}>
                        <BallCanvas icon={technology.icon} />
                    </div>
                ))}
            </div>
        </motion.div>
    </div>
)


const HomePage = () => {
    const [displayML, setDisplayML] = useState(false)
    const [displayRole, setDisplayRole] = useState(false)
    const [displayTechnologies, setDisplayTechnologies] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div className="homepage min-h-screen">
            <div className="fixed inset-0 bg-cover bg-center opacity-25 z-[-1]"
                 style={{backgroundImage: `url(/static/images/alka7.png)`}} />
            
            <div className="flex flex-col md:flex-row justify-center items-center min-h-screen p-4">
                {displayTechnologies && !isMobile && (
                    <TechnologiesSection technologies={main_technologies} title="I work mainly with following Technos / Tools :" variants={technoUp} />
                )}

                <div className="card w-full md:w-1/2 bg-base-100 shadow-xl opacity-75 mt-16 md:mt-0 mx-4 md:mx-20">
                    <div className="card-body">
                        <TypedTitle text="Mahamadou ABOUBACAR" onComplete={() => setDisplayRole(true)} />
                        {displayRole && <TypedTitle text="Senior Freelance" onComplete={() => setDisplayML(true)} />}
                        {displayML && <TypedTitle text="Data Engineering | Data Science" onComplete={() => setDisplayTechnologies(true)} />}
                    </div>
                    <SocialLinks />
                </div>

                {displayTechnologies && !isMobile && (
                    <TechnologiesSection technologies={mobile_web_technologies} title="I'm also interested a lot in on device machine learning, and that's why I've worked on some side projects to familiarize with high performance languages and web/mobile technologies:" variants={technoDown} />
                )}

                {displayTechnologies && isMobile && (
                    <>
                        <TechnologiesSection technologies={main_technologies} title="I work mainly with following Technos / Tools :" variants={technoUp} />
                        <TechnologiesSection technologies={mobile_web_technologies} title="I'm also interested a lot in on device machine learning, and that's why I've worked on some side projects to familiarize with high performance languages and web/mobile technologies:" variants={technoDown} />
                    </>
                )}
            </div>
        </div>
    )
}

export default HomePage
