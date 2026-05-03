import os

from sqlalchemy.orm import Session

from . import auth, models
from .database import SessionLocal, engine


PROJECTS = [
    {
        "title": "RAG Complaint Chatbot",
        "description": "Retrieval-Augmented Generation system for handling customer complaints with LLMs and LangChain integration.",
        "category": "machine-learning",
        "tags": "RAG,LLM,LangChain,Python",
        "code_link": "https://github.com/soltsega/Rag-complaint-chatbot",
        "live_link": "https://github.com/soltsega/Rag-complaint-chatbot",
        "order": 1,
    },
    {
        "title": "Arat Kilo Community Hub",
        "description": "Python-powered pipeline with modern glassmorphism dashboard for Telegram quiz results visualization and community engagement.",
        "category": "web-development",
        "tags": "Dashboard,HTML,CSS",
        "code_link": "https://github.com/soltsega/Arat-Kilo-Gbi-Gubae-Community-Hub",
        "live_link": "https://github.com/soltsega/Arat-Kilo-Gbi-Gubae-Community-Hub",
        "order": 2,
    },
    {
        "title": "Financial Inclusion Forecasting",
        "description": "Advanced time-series analysis to forecast Ethiopia's digital financial transformation using Python and Scikit-Learn.",
        "category": "data-science",
        "tags": "Python,Forecasting,Time Series",
        "code_link": "https://github.com/soltsega/Forecasting-Financial-Inclusion-in-Ethiopia",
        "live_link": "https://github.com/soltsega/Forecasting-Financial-Inclusion-in-Ethiopia",
        "order": 3,
    },
    {
        "title": "Portfolio Management Optimization",
        "description": "Time-series forecasting tool for portfolio management optimization using advanced financial data analysis techniques.",
        "category": "data-science",
        "tags": "Time Series,Portfolio,Python",
        "code_link": "https://github.com/soltsega/Time-Series-Forecasting-for-Portfolio-Management-Optimization",
        "live_link": "https://github.com/soltsega/Time-Series-Forecasting-for-Portfolio-Management-Optimization",
        "order": 4,
    },
    {
        "title": "Change Point Analysis",
        "description": "Detecting changes and associating causes on time series data using advanced statistical modeling techniques.",
        "category": "data-analysis",
        "tags": "Statistics,Change Point,Jupyter",
        "code_link": "https://github.com/soltsega/Change-Point-Analysis-and-Statistical-Modeling-of-Time-Series-Data",
        "live_link": "https://github.com/soltsega/Change-Point-Analysis-and-Statistical-Modeling-of-Time-Series-Data",
        "order": 5,
    },
    {
        "title": "Credit Risk Analysis",
        "description": "Predictive modeling to assess credit risk using advanced machine learning algorithms and financial data analysis.",
        "category": "machine-learning",
        "tags": "Python,Credit Risk,Machine Learning",
        "code_link": "https://github.com/soltsega/Credit_Risk-Analysis",
        "live_link": "https://github.com/soltsega/Credit_Risk-Analysis",
        "order": 6,
    },
    {
        "title": "Resume Screening Using NLP",
        "description": "Automated resume screening system using Natural Language Processing to analyze and rank candidate qualifications efficiently.",
        "category": "machine-learning",
        "tags": "NLP,Python,Resume Screening",
        "code_link": "https://github.com/soltsega/Resume_Screening_Using_NLP",
        "live_link": "https://github.com/soltsega/Resume_Screening_Using_NLP",
        "order": 7,
    },
    {
        "title": "Telegram Data Pipeline",
        "description": "End-to-end data pipeline for Telegram data with YOLOv8 enrichment, Dagster orchestration, and analytical API endpoints.",
        "category": "machine-learning",
        "tags": "Data Pipeline,YOLO,Telegram",
        "code_link": "https://github.com/soltsega/An-end-to-end-telegram-data-pipeline",
        "live_link": "https://github.com/soltsega/An-end-to-end-telegram-data-pipeline",
        "order": 8,
    },
    {
        "title": "Universal Chronos Bridge",
        "description": "Unified chronological synchronization engine supporting Gregorian, Ethiopian, Islamic Hijri, and Sidama calendar systems with precise conversion algorithms.",
        "category": "software-engineering",
        "tags": "C++,Calendar,System",
        "code_link": "https://github.com/soltsega/-The-Universal-Chronos-Bridge",
        "live_link": "https://github.com/soltsega/-The-Universal-Chronos-Bridge",
        "order": 9,
    },
    {
        "title": "QA with Transformers",
        "description": "Implementation of transformer-based models for high-accuracy question answering tasks using state-of-the-art NLP techniques.",
        "category": "machine-learning",
        "tags": "Transformers,NLP,PyTorch",
        "code_link": "https://github.com/soltsega/Question-Answering-with-Transformers_NLP",
        "live_link": "https://github.com/soltsega/Question-Answering-with-Transformers_NLP",
        "order": 10,
    },
    {
        "title": "Bank Review Analysis",
        "description": "Sentiment analysis and topic modeling on Google Play Store reviews for banking applications to extract customer insights.",
        "category": "data-analysis",
        "tags": "Sentiment Analysis,NLP,Python",
        "code_link": "https://github.com/soltsega/Bank-Review-Analysis---Google-Playstore-Review-Analysis",
        "live_link": "https://github.com/soltsega/Bank-Review-Analysis---Google-Playstore-Review-Analysis",
        "order": 11,
    },
    {
        "title": "Insurance Risk Analysis",
        "description": "Comprehensive analysis of insurance data to identify trends, risks, and optimization opportunities using statistical modeling.",
        "category": "data-analysis",
        "tags": "Python,Insurance,Analysis",
        "code_link": "https://github.com/soltsega/Insurance-Analysis",
        "live_link": "https://github.com/soltsega/Insurance-Analysis",
        "order": 12,
    },
]


CREDENTIALS = [
    {
        "title": "KAIM Professional AI Specialist",
        "subtitle": "Knowledge AI Model Certification",
        "description": "Mastery of Retrieval-Augmented Generation (RAG) and Large Language Model (LLM) orchestration for complex problem-solving.\nAdvanced proficiency in evaluating model architectures, latency optimization, and knowledge grounding.\nSpecialized expertise in deploying production-ready AI systems with a focus on systemic reliability.",
        "category": "work",
        "image_url": "/credentials/KAIM_main.jpg",
        "order": 1,
    },
    {
        "title": "KAIM Advanced Technical Insights",
        "subtitle": "Advanced AI Modeling Details",
        "description": "Deep technical exploration of transformer-based architectures, including attention mechanisms and parameter tuning.\nSpecialized knowledge in model quantization, fine-tuning, and handling edge-case behaviors in generative systems.\nIn-depth analysis of AI-grounded reasoning and system-driven optimization for knowledge retention.",
        "category": "work",
        "image_url": "/credentials/KAIM_details.jpg",
        "order": 2,
    },
    {
        "title": "Elevvo NLP & Language AI Pathways",
        "subtitle": "",
        "description": "Advanced specialization in Natural Language Processing, focusing on semantic analysis and language understanding.\nProficiency in building sophisticated text processing pipelines and deploying sentiment analysis frameworks.\nMastery of state-of-the-art transformer models for complex linguistic tasks and contextual reasoning.",
        "category": "work",
        "image_url": "/credentials/Elevvo_pathways_NLP.jpg",
        "order": 3,
    },
    {
        "title": "Stanford Machine Learning Specialization",
        "subtitle": "Machine Learning Specialization by Andrew Ng",
        "description": "Expertise in supervised learning algorithms, including precision-driven regression and high-accuracy classification.\nMastery of unsupervised learning techniques for pattern discovery, clustering, and dimensional reduction.\nAdvanced implementation of neural networks and complex recommender systems for data-driven insights.",
        "category": "work",
        "image_url": "/credentials/Coursera_ML.jpg",
        "order": 4,
    },
    {
        "title": "Data Analytics Professional",
        "subtitle": "Professional Certificate",
        "description": "Advanced data engineering and analytical skills, emphasizing data integrity, cleaning, and lifecycle management.\nMastery of SQL for complex data manipulation and R/Tableau for high-impact statistical visualizations.\nExecution of end-to-end data projects designed to extract actionable intelligence from fragmented datasets.",
        "category": "work",
        "image_url": "/credentials/coursera_data_analytics.jpg",
        "order": 5,
    },
    {
        "title": "Excel Basics for Data Analysis",
        "subtitle": "Coursera Certification",
        "description": "Advanced proficiency in utilizing Excel for comprehensive data analysis and robust data interpretation.\nMastery of complex data visualization techniques and dashboard creation for actionable business insights.\nImplementation of foundational data modeling and transformation workflows in spreadsheet environments.",
        "category": "work",
        "image_url": "/credentials/Coursera_Excel.jpg",
        "order": 6,
    },
    {
        "title": "Server-side Development with FastAPI",
        "subtitle": "Coursera Certification",
        "description": "Mastery of high-performance API development using Python and FastAPI.\nImplementation of asynchronous programming, data validation with Pydantic, and dependency injection.\nDeployment of scalable web services with automated documentation and robust security features.",
        "category": "work",
        "image_url": "/credentials/Coursera-fastapi.jpg",
        "order": 7,
    },
    {
        "title": "Essentials with Azure Fundamentals",
        "subtitle": "Microsoft | Offered through Coursera",
        "description": "Studying Microsoft Azure through Azure Fundamentals helps me apply machine learning and data science in real-world scenarios.\nIt gives me the ability to manage data, use scalable computing resources, and deploy models in the cloud instead of just building them locally.\nThrough Coursera, I gained an understanding of cloud-based tools and services that support the full ML pipeline, making my skills more practical and industry-ready.",
        "category": "work",
        "image_url": "/credentials/coursera_azure_fundamentals.jpg",
        "verify_link": "https://coursera.org/verify/ZUK5UU8QHKCI",
        "order": 8,
    },
    {
        "title": "AI & Deep Learning Foundations",
        "subtitle": "",
        "description": "Comprehensive understanding of neural network topologies, deep learning paradigms, and ethical AI frameworks.\nSpecialization in the societal impact and technical governance of generative AI and computer vision systems.\nMastery of fundamental AI architectures and their application in solving complex industrial challenges.",
        "category": "work",
        "image_url": "/credentials/Artificial Intelligence Fundamentals.jpg",
        "order": 9,
    },
    {
        "title": "Full-Stack Programming Architecture",
        "subtitle": "Web Systems Core",
        "description": "Mastery of core web technologies (HTML5, CSS3, ES6+) with a focus on semantic structure and interactive systems.\nProficiency in building high-performance, responsive front-end architectures with modern design patterns.\nUnderstanding of the full software development lifecycle, from system design to cross-platform deployment.",
        "category": "work",
        "image_url": "/credentials/Programming_Fundamentals-html_css_js.jpg",
        "order": 10,
    },
    {
        "title": "Advanced Front-end Engineering",
        "subtitle": "SoloLearn Certification",
        "description": "Specialization in modern front-end design, focusing on component-based architecture and responsive paradigms.\nExpertise in crafting sophisticated user interfaces using advanced CSS3 and interactive JavaScript.\nOptimization of UI/UX for performance, accessibility, and professional fidelity.",
        "category": "work",
        "image_url": "/credentials/SoloLearn-Front-end-course.jpg",
        "order": 11,
    },
    {
        "title": "Advanced Python Systems Development",
        "subtitle": "SoloLearn Certification",
        "description": "Mastery of functional and object-oriented programming paradigms for scalable system architecture.\nProficiency in advanced data structures, algorithmic optimization, and asynchronous programming in Python.\nImplementation of sophisticated data processing libraries for high-level technical solutions.",
        "category": "work",
        "image_url": "/credentials/SoloLearn-python-Intermediate-course.jpg",
        "order": 12,
    },
    {
        "title": "SQL Mastery",
        "subtitle": "Relational Database Specialization",
        "description": "Advanced proficiency in architecting complex relational queries for cross-functional data extraction.\nImplementation of robust database design principles, including relational normalization and data integrity.\nProficiency in optimizing data retrieval workflows for scalable application performance.",
        "category": "work",
        "image_url": "/credentials/Sololearn_sql.jpg",
        "order": 13,
    },
    {
        "title": "Merit-Based Academic Scholarship",
        "subtitle": "",
        "description": "Prestigious recognition awarded for exceptional academic performance and top-tier examination results.\nSelected based on elite achievement in the Ethiopian University Entrance Examination and University Admission Test, with a score of 567/600.\nRecognition of superior intellectual capacity and commitment to rigorous academic excellence.",
        "category": "academic",
        "image_url": "/credentials/Scholarship.png",
        "order": 14,
    },
    {
        "title": "Distinction of Highest Academic Achievement",
        "subtitle": "",
        "description": "Consistent record of achieving the highest academic scores in technical and mathematical domains.\nDemonstrated mastery of complex subject matter through disciplined research and competitive performance.\nRecognition of elite analytical thinking and dedication to mastering advanced technical curriculums.",
        "category": "academic",
        "image_url": "/credentials/Honor_of_Top_Score.jpg",
        "order": 15,
    },
    {
        "title": "National Stem Excellence (EUEE)",
        "subtitle": "Ethiopian University Entrance Examination",
        "description": "Top-tier performance in national standardized examinations, specifically in advanced mathematics and physics.\nRecognition of elite analytical and problem-solving skills at a national level.\nHigh-ranking percentile achievement representing academic rigor and intellectual capacity.",
        "category": "academic",
        "image_url": "/credentials/EUEE Score.jpg",
        "order": 16,
    },
    {
        "title": "STEM Computer Training",
        "subtitle": "Foundational Technical Development",
        "description": "Foundational immersion in computer programming, covering the basics of C++, HTML, and CSS.\nHands-on, project-based engagement with digital electronics and fundamental circuit design.\nDemonstrated high potential and early passion for advanced computational thinking and hardware-software integration.",
        "category": "stem-exposure",
        "image_url": "/credentials/STEM_Computer_Training.jpg",
        "order": 17,
    },
    {
        "title": "STEM Outreach Summer Camp",
        "subtitle": "Applied Scientific Engagement",
        "description": "Active participation in intensive, hands-on scientific and technical workshops.\nCollaborative problem solving and practical applications in a fast-paced environment.\nExceptional foundation for advanced technical rigor and academic excellence.",
        "category": "stem-exposure",
        "image_url": "/credentials/STEM_Outreach_Summer_camp.jpg",
        "order": 18,
    },
    {
        "title": "Professional Business Communications",
        "subtitle": "Professional Development",
        "description": "Mastery of professional communication strategies for effective workplace interaction.\nExpertise in drafting technical reports, delivering presentations, and managing cross-functional stakeholder relations.\nFocus on clarity, professional etiquette, and strategic information dissemination.",
        "category": "personal-development",
        "image_url": "/credentials/Business communications.jpg",
        "order": 19,
    },
    {
        "title": "The Science of Well-Being",
        "subtitle": "Yale University | Offered through Coursera",
        "description": "Exploration of psychological research on happiness and human flourishing.\nImplementation of evidence-based strategies for behavioral change and habit formation.\nApplication of positive psychology principles to enhance productivity and professional resilience.",
        "category": "personal-development",
        "image_url": "/credentials/coursera-science of wellbeing.jpg",
        "order": 20,
    },
]


def upsert_records(db: Session, model, records, lookup_field):
    for record in records:
        existing = db.query(model).filter(getattr(model, lookup_field) == record[lookup_field]).first()

        if existing:
            for key, value in record.items():
                setattr(existing, key, value)
        else:
            db.add(model(**record))

    db.commit()


def seed_db():
    models.Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        admin_username = os.getenv("ADMIN_USERNAME", "admin")
        admin_password = os.getenv("ADMIN_PASSWORD", "admin123")

        user = db.query(models.User).filter(models.User.username == admin_username).first()
        if not user:
            db.add(
                models.User(
                    username=admin_username,
                    hashed_password=auth.get_password_hash(admin_password),
                )
            )
            db.commit()

        upsert_records(db, models.Project, PROJECTS, "title")
        upsert_records(db, models.Credential, CREDENTIALS, "title")
    finally:
        db.close()


if __name__ == "__main__":
    seed_db()
