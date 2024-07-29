import React from "react"
import SkillBlock from "./SkillBlock"
import Skills from "./Skills"
import Education from "./Education"
import Experience from "./Experience"

const Resume = ({ navBarHeight }) => {
  return (
    <div
      className="flex flex-col md:flex-row min-h-screen"
      style={{ paddingTop: navBarHeight }}
    >
      <div className="w-full md:w-2/5 bg-gray-800 p-4 md:overflow-y-auto">
        <div className="flex flex-col items-center mt-5">
          <img
            alt="Profile"
            src="/static/images/alka3.jpg"
            className="rounded-full w-32 h-32 md:w-52 md:h-52"
          />
          <h2 className="text-lg md:text-xl mt-2">Mahamadou S. ABOUBACAR A.</h2>
          <h4 className="text-lg md:text-xl">Senior Consultant</h4>
          <h5 className="text-lg md:text-xl">
            Data Science | Data Engineering
          </h5>
          <hr className="border-t-2 border-slate-400 w-1/2 my-5" />
          <p className="text-sm md:text-base mb-4">
            Currently working as Freelance Data Engineer consultant
          </p>
          <p className="text-sm md:text-base text-justify">
            I've worked for {new Date().getFullYear() - 2018}+ years across
            various data science and data engineering roles. I started my career
            as a Research Engineer in machine learning for cyber security, then
            switched to computer vision applied to video surveillance images
            analysis.
            <br />
            I later joined Quantmetry (a cutting edge AI consulting company,
            later acquired by Capgemini) as a senior data scientist consultant
            and worked for various customers ranging from public, defense,
            transportation, energy sectors on various subjects such as tweets
            analysis app, web scraping app for supply chain, Reliable AI
            training content creation, building data processing pipelines for
            Renewable energy datalake ...
            <br />
            In my free time, I am mostly interested in subjects related to
            Computer Vision, NLP, on-device machine learning and data
            visualization. That's why I explore high performant languages
            (C/C++, Rust) and web/mobile development (React/react-native,
            Kotlin) You can find some of my side projects on this website and
            also
            <a
              href="https://github.com/AlkaSaliss?tab=repositories"
              rel="noopener noreferrer"
              target="_blank"
              className="text-blue-500"
            >
              {" "}
              on github.
            </a>
          </p>
        </div>
      </div>
      <div className="w-full md:w-3/5 p-4 md:overflow-y-auto flex-grow">
        <div className="space-y-8">
          {/* <section> */}
            <h2 className="text-lg md:text-xl mb-4">Experience</h2>
            <Experience
              startYear="July 2024"
              endYear="Now"
              jobName="Senior Freelance Data Engineer"
              company="Customer in Energy Sector"
              team="DataLab"
              showSubjectList={false}
              subject="I work as an admin/tech lead on an Analytics platform, based on AWS services. I create data ingestion pipelines to bring data from multiple sources (api, s3, databases, ...) on this platform for end users to conduct their use cases. I also lead training sessions to onboard new users on the platform. Finally, I serve as intermediary the product company and end users to report bugs, issues and feature requests."
              methods="Data Ingestion, ETL pipelines, Platform Engineering"
              tools="Python, AWS S3/Athena/Redshift/Sagemaker/Glue/Quicksight, Pandas/Polars , Jupyter, Terraform/Terragrunt"
            />
            <Experience
              startYear="October 2021"
              endYear="June 2024"
              jobName="Senior Consultant Data Scientist | Data Engineer"
              company="Quantmetry (acquired by Capgemini), Paris, France"
              team="Computer Vision"
              showSubjectList={true}
              subject={[
                "Worked 2 years at EDF Renouvelables, as tech lead data engineer of a team that builds AWS data pipelines (Lambda/SQS, S3, Athena, Redshift, RDS, EventBridge, Grafana) to ingest and process data coming from solar power sites around the world. The curated data is then used by sites and assets managers to calculate some KPI to assess solar energy production performance",
                "Built a Streamlit web app for a customer in Transport sector, to allow them to analyze multiple data sources and produce a formatted Excel report. The app cut the analysis time from 1-2 weeks to less than 10mins, allow users to focus on analysis interpretation and ",
                "Worked with various customer on different subjects, such as POC on uncertainty estimation for satellite images segmentation, tweets scrapping and analysis (topic modelling, sentiment analysis), web scraping for supply chain, training content creation on reliable AI topics, ...",
              ]}
              methods="Data ingestion | Data processing | Machine learning | Deep learning | Data analysis/visualization | Software engineering"
              tools="Python | AWS | Pytorch | Scikit-learn | Docker | Linux | Spark"
            />
            <Experience
              startYear="Nov 2018"
              endYear="Oct 2021"
              jobName="Research Engineer - Machine Learning"
              company="Atos, Paris region, France"
              team="Machine Intelligence for Cyber Security"
              showSubjectList={true}
              subject={[
                "Developed computer vision segmentation models for video surveillance analysis",
                "Worked on machine learning based frameworks for anomaly detection in cyber security",
              ]}
              methods="Machine learning | Deep learning | Data analysis/visualization | Software engineering"
              tools="Python | Pytorch | Tensorflow/Keras | Scikit-learn | Docker | Linux | Spark"
            />
            <Experience
              startYear="Apr 2018"
              endYear="Sep 2018"
              jobName="Deep learning intern"
              company="Equancy, Paris, France"
              team="Data Intelligence"
              showSubjectList={false}
              subject="Deep learning based approaches for 'translating natural language questions to SQL queries'"
              methods="Sequence-to-sequence Deep Learning models"
              tools="Python | Tensorflow/Keras | Spacy | Scikit-learn | AWS"
            />
            <Experience
              startYear="June 2017"
              endYear="Aug 2017"
              jobName="Statistician intern"
              company="Le Crédit Lyonnais (LCL), Paris region, France"
              team="Quantitative Models Validation"
              showSubjectList={false}
              subject="Anomaly analysis on credit risk data"
              methods="Regression models | Exploratory data analysis"
              tools="SAS"
            />
            <Experience
              startYear="Feb 2016"
              endYear="June 2016"
              jobName="Statistician/Economist intern"
              company="Laboratoire de Recherches Economiques et Monétaires (LAREM), Dakar, Sénégal"
              team="LAREM"
              showSubjectList={false}
              subject="Determinant of innovation in small & medium enterprises in Ivory-Coast"
              methods="Multivariate Probit models | Exploratory data analysis"
              tools="R | Stata"
            />
          {/* </section>
          <section> */}
            <hr className="border-t-2 border-blue-500 my-4" />
            <h2 className="text-lg md:text-xl mb-4">Education</h2>
            <Education
              startYear={2020}
              endYear={2020}
              degree="Data Engineering Nanodegree"
              schoolName="UDACITY -Online"
              major="ETL pipelines with PostgreSQL | ETL with AWS RedShift/S3 | Big Data with Pyspark and AWS EMR | Data pipelines with Airflow"
            />
            <Education
              startYear={2016}
              endYear={2018}
              degree="Engineering degree in Data Science / Statistics / Data Engineering"
              schoolName="ENSAI - Rennes, France"
              major="Machine Learning Modeling | Statistics/Econometrics | Big Data technologies | Software & Web Development"
            />
            <Education
              startYear={2012}
              endYear={2016}
              degree="Engineering degree in Statistics / Economics"
              schoolName="ENSAE - Dakar, Senegal"
              major="Statistical modelling | Econometrics | Survey Data collection and analysis | Economics"
            />
            <hr className="border-t-2 border-blue-500 my-4" />
          {/* </section>
          <section> */}
            <h2 className="text-lg md:text-xl mb-4">Skills</h2>
            <SkillBlock blockName="Data Engineering">
              <Skills
                skill="Data ingestion pipelines on AWS (Lambda, SQS, SNS, S3, Glue, SageMaker)"
                progress={74}
              />
              <Skills skill="Data warehouse (Redshift, RDS)" progress={74} />
              <Skills
                skill="Data processing (Pandas, Polars, PySpark)"
                progress={90}
              />
              <Skills
                skill="Monitoring/Alerting (CloudWatch metrics, and alarms, SNS, Grafana)"
                progress={74}
              />
              <Skills
                skill="CI/CD (Codecommit, Codebuild, CodePipeline, Codeartifact)"
                progress={74}
              />
            </SkillBlock>
            <hr className="border-t border-gray-300 my-4 mx-20" />
            <SkillBlock blockName="Data Science">
              <Skills
                skill="Linear models | Tree-based models | Clustering techniques (Scikit-learn)"
                progress={90}
              />
              <Skills
                skill="Deep Learning (Pytorch, Tensorflow/Keras)"
                progress={90}
              />
              <Skills
                skill="Data Analysis (Pandas, Numpy, Jupyter)"
                progress={90}
              />
              <Skills
                skill="Data Viz (d3.js, Matplotlib, Bokeh, Plotly)"
                progress={80}
              />
            </SkillBlock>
            <hr className="border-t border-gray-300 my-4 mx-20" />
            <SkillBlock blockName="Software | Web | Mobile Dev">
              <Skills skill="Python" progress={95} />
              <Skills skill="Linux | Bash | Docker" progress={70} />
              <Skills skill="Git" progress={80} />
              <Skills skill="Javascript | React | React-Native" progress={49} />
              <Skills skill="C++ | Rust" progress={49} />
              <Skills skill="Kotlin | Android studio" progress={49} />
              <Skills skill="HTML | CSS" progress={49} />
            </SkillBlock>
          {/* </section> */}
        </div>
      </div>
    </div>
  )
}

export default Resume
