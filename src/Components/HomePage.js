//HomePage.js

import React, { useState } from 'react'
import { TypeAnimation } from 'react-type-animation'
import { Icon } from '@iconify/react'

const HomePage = () => {
    const [displayML, setDisplayML] = useState(false)

    return (

        <div className="homepage">
            <div style={{
                backgroundImage: `url(/images/alka0.jpg)`,
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
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
            }}>
                <div className="card w-1/2 h-1/3 bg-base-100 shadow-xl opacity-75" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div className="card-body">
                        <h2 className="card-title justify-center mb-5">
                            <TypeAnimation
                                sequence={['Mahamadou ABOUBACAR', 1000, () => setDisplayML(true)]}
                                speed={50}
                                style={{ fontSize: '2em', fontStyle: 'italic' }}
                            />
                        </h2>
                        {
                            displayML &&
                            <h3 className="card-title justify-center">
                                <TypeAnimation
                                    sequence={['Data Scientist (Computer Vision)', 1000, "Data Engineer", 1000, 'Data Scientist (Computer Vision) | Data Engineer']}
                                    speed={50}
                                />
                            </h3>
                        }
                    </div>
                    <div className="flex w-full" id="links" style={{ padding: '1rem' }}>
                        <div className="grid h-20 w-10 flex-grow card bg-base-300 rounded-box place-items-center">
                            <a href='https://github.com/AlkaSaliss' rel="noopener noreferrer" target='_blank'>
                                <Icon icon="mdi:github" style={{ fontSize: '5em' }} />
                            </a>
                        </div>
                        <div className="divider divider-horizontal">{"<>"}</div>
                        <div className="grid h-20 w-10 flex-grow card bg-base-300 rounded-box place-items-center">
                            <a href='https://www.linkedin.com/in/alkai' rel="noopener noreferrer" target='_blank'>
                                <Icon icon="mdi:linkedin" style={{ fontSize: '5em' }} />
                            </a>
                        </div>
                        <div className="divider divider-horizontal">{"<>"}</div>
                        <div className="grid h-20 w-10 flex-grow card bg-base-300 rounded-box place-items-center">
                            <a href='https://stackoverflow.com/users/7437524/alka' rel="noopener noreferrer" target='_blank'>
                                <Icon icon="devicon-plain:stackoverflow-wordmark" style={{ fontSize: '5em' }} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
