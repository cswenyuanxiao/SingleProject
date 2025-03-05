---
title: "Peer Review Research Hub"
description: "A platform for analyzing and improving peer review effectiveness"
layout: "home"
---

## Welcome!
Peer Review Research Hub is an interactive platform that explores the **effectiveness of peer reviews** across different types of courses and assessment formats. 

## Project Background & Goals
In today's education landscape, peer review plays a crucial role in enhancing student engagement and critical thinking. However, different subjects—like **computer programming** vs. **essay writing**—may have drastically different peer review effectiveness. Meanwhile, **AI-based grading systems** are emerging, raising questions about how they compare with human assessments.

Our project sets out to:
- Compare consistency and fairness of peer reviews in coding vs. essay tasks
- Evaluate AI vs. human grading results
- Gather suggestions to improve peer review processes

Explore the **[Comparison](/comparison/)** page for interactive charts and data analysis, or submit your own **[Suggestions](/suggestions/)** to help us refine the peer review approach!

## Key Insights (Preview)
- **85%** → Coding peer reviews show high consistency index  
- **78%** → Essay peer reviews align with instructor feedback  
- **92%** → AI-human agreement rate on coding tasks  

## Getting Started

Want to run this site locally or contribute to the project? Follow these steps:

1. **Clone the repository**
   ```bash
   git clone https://github.com/cswenyuanxiao/SingleProject.git
   cd SingleProject/quickstart
   ```

2. **Use our setup scripts**
   
   For macOS/Linux:
   ```bash
   ./setup.sh
   ```
   
   For Windows:
   ```batch
   setup.bat
   ```
   
   Or manually install dependencies:
   ```bash
   npm install
   hugo mod get -u
   ```

3. **Run the site**
   ```bash
   hugo server -D
   ```

4. **Open in browser**
   Visit [http://localhost:1313/SingleProject/](http://localhost:1313/SingleProject/)

For more details, see our [README](https://github.com/cswenyuanxiao/SingleProject) on GitHub.

Readme-style Template

---

# Peer Review Research Hub  
**Open-Science Platform for Assessment Analytics**  
[![Hugo Version](https://img.shields.io/badge/Hugo-0.111.3-FF4088)](https://gohugo.io/)  
[![License CC-BY-4.0](https://img.shields.io/badge/License-CC_BY_4.0-lightgrey)](https://creativecommons.org/licenses/by/4.0/)  

---

## 📋 Table of Contents  
1. [Research Design](#-research-design)  
2. [Tech Stack](#-tech-stack)  
3. [Data Pipeline](#-data-pipeline)  
4. [Get Involved](#-get-involved)  
5. [Roadmap](#-roadmap)  
6. [Citation](#-citation)  

---

## 🔬 Research Design  

### Mixed-Methods Framework  
```mermaid  
graph TD  
A[Data Collection] --> B[Quantitative Analysis]  
A --> C[Qualitative Coding]  
B --> D1["ICC Consistency Metrics"]  
B --> D2["SEM Path Modeling"]  
C --> D3["Thematic Analysis"]  
C --> D4["Sentiment Scoring"]  
D1 --> E[Cross-Disciplinary Insights]  
D3 --> E  
```  

### Key Components  
| Module               | Tools                          | Output Example                  |  
|----------------------|--------------------------------|---------------------------------|  
| **Review Collection**| Google Forms + Firebase        | 520+ structured reviews         |  
| **Coding Analysis**  | Python + NLTK                  | Code quality prediction models  |  
| **Essay Evaluation** | R + lme4                       | Grading bias heatmaps           |  
| **AI Benchmarking**  | TensorFlow + sklearn           | F1-score comparison matrices    |  

---

## 🛠️ Tech Stack  

### Core Architecture  
```bash  
.
├── content/               
├── data/                  
│   ├── coding_reviews.csv  
│   └── essay_feedback.parquet  
├── layouts/               
│   ├── comparison/        
│   └── shortcodes/         
├── static/                
│   ├── js/chart-init.js    
│   └── css/custom.scss     
└── config/                 
    ├── R/                 
    └── python/            
```

### Dependencies  
```toml  
# hugo.toml 
[module]  
[[module.imports]]  
path = "github.com/wowchemy/wowchemy-hugo-modules/netlify"  
[[module.imports]]  
path = "github.com/peaceiris/hugo-mod-utterances"   

# (requirements.txt)  
numpy==1.26.0  
pandas==2.1.0  
scikit-learn==1.3.0  
tensorflow==2.15.0  
```  

---

## 📊 Data Pipeline  

### Collection Protocol  
1. **Ethical Approval**  
   - University IRB #2024-EDU-037  
   - Anonymized participant IDs  

2. **Data Types**  
   - Structured: Rubric scores (5-point Likert)  
   - Unstructured: Feedback text + AI grading logs  

### Processing Workflow  
```python    
def preprocess_reviews(df):  
    df = df.dropna(subset=['feedback'])  
    df['sentiment'] = df['feedback'].apply(vader_analyzer)  
    return df.to_parquet('clean_data.parquet')  
```

### Access Policy  
- **Public Dataset**: [Zenodo Archive](https://zenodo.org/records/xxxx)  
- **Sensitive Data**: Contact PI via [email](#contact)  

---

## 🤝 Get Involved  

### As a Participant  
```markdown
1. **Students**:  
   - [Join Survey](https://your-survey-link) (15 mins)  
   - Opt-in for focus groups  

2. **Educators**:  
   - Contribute rubric designs  
   - Share de-identified grading data  
```

### As a Developer  
```bash  
 
git clone https://github.com/yourname/peer-review-research.git  
cd peer-review-research  
hugo server -D --disableFastRender  


---

## 🗺️ Roadmap  
| Quarter      | Milestone                      | Status       |  
|--------------|--------------------------------|--------------|  
| 2024 Q2      | Multi-institutional validation | ✅ Completed |  
| 2024 Q3      | Open-source toolkit v1.0       | 🔄 In Progress |  
| 2025 Q1      | MOOC integration pilot         | ⏳ Planned   |  

---

## 📚 Citation  
```bibtex  
@software{PeerReviewHub2024,  
  author = {Xiao, Wenyuan},  
  title = {Peer Review Research Hub},  
  year = {2024},  
  publisher = {GitHub},  
  journal = {GitHub repository},  
  howpublished = {\url{https://github.com/your-repo}}  
}  
```  

---

## 📧 Contact  
For collaboration inquiries or data access:  
- 📧 Email: [2715237x@student.gla.ac.uk]
- 💬 Discussion: [GitHub Issues](https://github.com/cswenyuanxiao/SingleProject/issues)  

---

