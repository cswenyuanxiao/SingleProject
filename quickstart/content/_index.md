---
title: "Peer Review Research Hub(Template, not real data)"
description: "A platform for analyzing and improving peer review effectiveness"
layout: "home"
---

## Welcome!
Peer Review Research Hub is an interactive platform that explores the **effectiveness of peer reviews** across different types of courses and assessment formats. This research compares peer review approaches in computer programming assignments (COMPSCI4081) versus essay-based tasks (COMPSCI4038).



## Tech Stack

This project is built with:

- **[Hugo](https://gohugo.io/)**  - Static site generator
- **[Bootstrap](https://getbootstrap.com/)** - Frontend framework
- **[Chart.js](https://www.chartjs.org/)** - Interactive data visualizations
- **Python** ecosystem:
  - NumPy 
  - Pandas 
  - scikit-learn 
  - TensorFlow 
- **R** for statistical analysis
  - lme4
  - ggplot2

### Project Structure
```bash  
quickstart/
|- archetypes/
|  |- default.md
|- assets/
|- content/
|  |- _index.md
|  |- comparison/
|  |  |- _index.md
|  |  |- ai-vs-human.md
|  |  |- coding-vs-essay.md
|  |- suggestions/
|     |- _index.md
|     |- ai-enhancement.md
|     |- improve_feedback.md
|- data/
|  |- coding-vs-essay.yaml
|- layouts/
|  |- _default/
|  |  |- baseof.html
|  |  |- linechart.html
|  |- comparison/
|  |  |- linechart.html
|  |  |- list.html
|  |  |- single.html
|  |- index.html
|  |- partials/
|  |  |- footer.html
|  |  |- head.html
|  |  |- navbar.html
|  |- suggestions/
|     |- _index.html
|     |- single.html
|- static/
|  |- css/
|  |  |- custom.css
|  |- images/
|  |- js/
|     |- chart-init.js
|     |- chart-init-line.js
|     |- chart.js
|- hugo.toml        
```

## Getting Started

Want to run this site locally or contribute to the research? Follow these steps:

1. **Clone the repository**
   ```bash
   git clone https://github.com/cswenyuanxiao/SingleProject.git
   cd SingleProject/quickstart
   ```

2. **Install dependencies**
   
   For macOS/Linux:
   ```bash
   ./setup.sh
   ```
   
   For Windows:
   ```batch
   setup.bat
   ```
   
   Or manually:
   ```bash
   npm install
   hugo mod get -u
   ```

3. **Run the development server**
   ```bash
   hugo server -D --disableFastRender
   ```

4. **View in browser**
   Visit [http://localhost:1313/](http://localhost:1313/)




## Roadmap  
| Quarter      | Milestone                      | Status       |  
|--------------|--------------------------------|--------------|  
| 2024 Q2      | Multi-institutional validation | ✅ Completed |  
| 2024 Q3      | Open-source toolkit v1.0       | 🔄 In Progress |  
| 2025 Q1      | MOOC integration pilot         | ⏳ Planned   |  

## Citation  
```bibtex  
@software{PeerReviewHub2024,  
  author = {Xiao, Wenyuan},  
  title = {Peer Review Research Hub},  
  year = {2024},  
  publisher = {GitHub},  
  journal = {GitHub repository},  
  howpublished = {\url{https://github.com/cswenyuanxiao/SingleProject}}  
}  
```  

## Contact  
For collaboration inquiries or data access:  
- 📧 Email: [2715237x@student.gla.ac.uk](mailto:2715237x@student.gla.ac.uk)
- 💬 Discussion: [GitHub Issues](https://github.com/cswenyuanxiao/SingleProject/issues)
---

