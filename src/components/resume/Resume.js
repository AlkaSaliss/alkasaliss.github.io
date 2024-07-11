import React from 'react'
import SkillBlock from './SkillBlock'
import Skills from './Skills'
import Education from './Education'
import Experience from './Experience'

const Resume = ({ navBarHeight }) => {
  return (
    <div className="flex h-screen overflow-hidden" style={{ paddingTop: navBarHeight }}>
      <div className="w-2/5 bg-gray-800  p-4">
        <div className="flex flex-col items-center mt-5">
          <img alt="Profile" src="/static/images/alka3.jpg" className="rounded-full w-52 h-52" />
          <h2 className="text-xl mt-2">Mahamadou S. ABOUBACAR A.</h2>
          <h4 className="text-xl">Senior Consultant</h4>
          <h5 className="text-xl">Data Science | Data Engineering</h5>
          <hr className="border-t-2 border-slate-400 w-1/2 my-5" />
          <p className="text-base mb-4">
            Currently working as Freelance Data Engineer consultant
          </p>
          <p className="text-base text-justify">
            I've worked for {new Date().getFullYear() - 2018}+ years across various data science and data engineering roles.
            I started my career as a Research Engineer in machine learning for cyber security, then switched to computer vision applied to video surveillance images analysis.
            <br />
            I later joined Quantmetry (a cutting edge AI consulting company, later acquired by Capgemini) as a senior data scientist consultant and worked for various customers
            ranging from public, defense, transportation, energy sectors on various subjects such as tweets analysis app, web scraping app for supply chain, Reliable AI training content creation,
            building data processing pipelines for Renewable energy datalake ...
            <br />
            In my free time, I am mostly interested in subjects related to Computer Vision, NLP, on-device machine learning and data visualization.
            That's why I explore high performant languages (C/C++,  Rust) and web/mobile development (React/react-native, Kotlin)
            You can find some of my side projects on this website and also
            <a href='https://github.com/AlkaSaliss?tab=repositories' rel="noopener noreferrer" target='_blank' className="text-blue-500"> on github.</a>
          </p>
        </div>
      </div>
      <div className="w-3/5 p-4 overflow-y-auto">
        <h2 className="text-xl mb-4">Experience</h2>
        <Experience
          startYear='October 2021'
          endYear='Now'
          jobName='Senior Data Scientist'
          company='Quantmetry, Paris, France'
          team='Computer Vision'
          subject="Working with various customer on different subjects, such as tweets analysis, web scraping for supply chain, training content creation for reliable AI, ..."
          methods="Machine learning | Deep learning | Data analysis/visualization | Software engineering"
          tools="Python | Pytorch | Scikit-learn | Docker | Linux | Spark"
        />
        <Experience
          startYear='Nov 2018'
          endYear='Oct 2021'
          jobName='Research Engineer - Machine Learning'
          company='Atos, Les Clayes-Sous-Bois, France'
          team='Machine Intelligence for Cyber Security'
          subject="Developed computer vision segmentation models for video surveillance analysis. Also worked on machine learning based frameworks for anomaly detection in cyber security."
          methods="Machine learning | Deep learning | Data analysis/visualization | Software engineering"
          tools="Python | Pytorch | Tensorflow/Keras | Scikit-learn | Docker | Linux | Spark"
        />
        <Experience
          startYear='Apr'
          endYear='Sep 2018'
          jobName='Deep learning intern'
          company='Equancy, Paris, France'
          team='Data Intelligence'
          subject="Deep learning based approaches for 'translating natural language questions to SQL queries'"
          methods="Sequence-to-sequence Deep Learning models"
          tools="Python | Tensorflow/Keras | Spacy | Scikit-learn | AWS"
        />
        <Experience
          startYear='June'
          endYear='Aug 2017'
          jobName='Statistician intern'
          company='Le Crédit Lyonnais (LCL), Villejuif, France'
          team='Quantitative Models Validation'
          subject="Anomaly analysis on credit risk data"
          methods="Regression models | Exploratory data analysis"
          tools="SAS"
        />
        <Experience
          startYear='Feb'
          endYear='June 2016'
          jobName='Statistician/Economist intern'
          company='Laboratoire de Recherches Economiques et Monétaires (LAREM), Dakar, Sénégal'
          team='LAREM'
          subject="Determinant of innovation in small & medium enterprises in Ivory-Coast"
          methods="Multivariate Probit models | Exploratory data analysis"
          tools="R | Stata"
        />
        <hr className="border-t-2 border-blue-500 my-4" />
        <h2 className="text-xl mb-4">Education</h2>
        <Education
          startYear={2020}
          endYear={""}
          degree="Data Engineering Nanodegree"
          schoolName='Udacity -Online'
          major="ETL pipelines with PostgreSQL | ETL with AWS RedShift/S3 | Big Data with Pyspark and AWS EMR | Data pipelines with Airflow"
        />
        <Education
          startYear={2016}
          endYear={2018}
          degree="Engineering degree in Data Science / Statistics / Data Engineering"
          schoolName='Ensai - Rennes, France'
          major="Machine Learning | Statistics/Econometrics | Big Data technologies | Software & Web Development"
        />
        <Education
          startYear={2012}
          endYear={2016}
          degree="Engineering degree in Statistics / Economics"
          schoolName='Ensae - Dakar, Senegal'
          major="Statistical modelling | Econometrics | Survey Data collection and analysis | Economics"
        />
        <hr className="border-t-2 border-blue-500 my-4" />
        <h2 className="text-xl mb-4">Skills</h2>
        <SkillBlock blockName='Data Science'>
          <Skills
            skill='Linear models | Tree-based models | Clustering techniques (Scikit-learn)'
            progress={90}
          />
          <Skills
            skill='Deep Learning (Pytorch, Tensorflow/Keras)'
            progress={90}
          />
          <Skills
            skill='Data Analysis (Pandas, Numpy)'
            progress={90}
          />
          <Skills
            skill='Data Viz (d3.js, Matplotlib, Bokeh, Plotly)'
            progress={80}
          />
        </SkillBlock>
        <hr className="border-t border-gray-300 my-4" />
        <SkillBlock blockName='Software | Web | Mobile Dev'>
          <Skills
            skill='Python'
            progress={95}
          />
          <Skills
            skill='Linux | Bash'
            progress={70}
          />
          <Skills
            skill='Git'
            progress={80}
          />
          <Skills
            skill='Docker'
            progress={70}
          />
          <Skills
            skill='Javascript | React | React-Native'
            progress={80}
          />
          <Skills
            skill='HTML | CSS'
            progress={70}
          />
        </SkillBlock>
      </div>
    </div>
  )
}

export default Resume