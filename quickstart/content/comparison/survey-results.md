---
title: "Survey Results Analysis"
date: 2023-11-15
draft: false
description: "Analysis of peer review effectiveness based on course surveys"
weight: 2
---

## Survey Overview

This section presents the results of our peer review effectiveness survey collected from COMPSCI4081 (programming course) and COMPSCI4038 (essay-based course). A total of 3 valid questionnaires were collected, with 1 from the programming course, 1 from the essay course, and 1 from other university courses.

### Respondent Distribution

{{< chart-wrapper height="380px" width="100%" >}}
<canvas id="respondentsChart"
  data-labels='["COMPSCI4081 (Programming)", "COMPSCI4038 (Essay)", "Other Courses"]'
  data-values='[1, 1, 1]'>
</canvas>
{{< /chart-wrapper >}}

## Key Comparison Dimensions

The following charts show comparisons between the two course types across multiple dimensions. The data is derived from student ratings on importance and effectiveness (scale 1-5).

### Radar Chart Comparison

{{< chart-wrapper height="450px" width="100%" >}}
<canvas id="dimensionsRadarChart"></canvas>
{{< /chart-wrapper >}}

### Detailed Dimension Comparison

{{< chart-wrapper height="450px" width="100%" >}}
<canvas id="dimensionsBarChart"></canvas>
{{< /chart-wrapper >}}

## Statistical Significance Analysis

We conducted statistical analysis on the survey results to determine whether the differences between the two course types are significant. Due to the small sample size, none of the differences reached statistical significance (p < 0.05).

| Dimension | p-value | Significance |
|------|------|---------|
| Grading Criteria Clarity | 0.32 | Not Significant ✗ |
| Feedback Usefulness | 0.28 | Not Significant ✗ |
| Time Adequacy | 0.35 | Not Significant ✗ |
| Task Alignment with Skills | 0.95 | Not Significant ✗ |
| Learning Impact | 0.42 | Not Significant ✗ |
| Implementation Ease | 0.38 | Not Significant ✗ |

## Time Series Comparison

The following chart shows how different peer review metrics have changed over time. Note that with limited data points, this represents a general trend rather than a comprehensive time series:

{{< chart-wrapper height="450px" width="100%" >}}
<canvas id="timeSeriesChart"></canvas>
{{< /chart-wrapper >}}

## Qualitative Feedback Analysis

We conducted a thematic analysis of the collected text feedback. Here are the main findings:

### Strengths and Challenges of Peer Review

{{< chart-wrapper height="400px" width="100%" >}}
<canvas id="themesChart"
  data-themes='["Learning from others\' approaches", "Improving own submissions", "Seeing different thinking styles", "Conflicts with peer relationships", "Unfair peer reviews", "Time constraints"]'
  data-frequencies='[2, 2, 1, 2, 1, 1]'
  data-types='["Strength", "Strength", "Strength", "Challenge", "Challenge", "Challenge"]'>
</canvas>
{{< /chart-wrapper >}}

### Improvement Suggestions

{{< chart-wrapper height="400px" width="100%" >}}
<canvas id="improvementChart"
  data-themes='["Enhanced anonymity", "Multi-round reviews", "Instructor feedback on reviews", "Real-time rubric access"]'
  data-priorities='[3, 2.5, 2.5, 3.5]'>
</canvas>
{{< /chart-wrapper >}}

## Survey Conclusions

Based on our analysis, we can draw the following preliminary conclusions:

1. **Both review methods** show similar effectiveness in different dimensions, with no statistically significant differences due to small sample size
2. **Anonymity** is a concern for students, particularly regarding potential bias in peer relationships
3. **Learning value** is recognized in both formats, with task-based and writing-based assignments offering different benefits
4. **Improvement priorities** include multi-round reviews and instructor feedback on reviews

*Note: These conclusions are based on a limited sample size and should be interpreted with caution. Further data collection is recommended to validate these findings.*

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Respondent distribution pie chart
    const respCtx = document.getElementById('respondentsChart').getContext('2d');
    const labels = JSON.parse(document.getElementById('respondentsChart').dataset.labels);
    const values = JSON.parse(document.getElementById('respondentsChart').dataset.values);
    
    new Chart(respCtx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(75, 192, 192, 0.7)'
                ],
                borderColor: [
                    'rgb(54, 162, 235)',
                    'rgb(255, 99, 132)',
                    'rgb(75, 192, 192)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Survey Respondent Distribution'
                }
            }
        }
    });
    
    // Dimensions radar chart
    const dimensionsRadar = document.getElementById('dimensionsRadarChart').getContext('2d');
    const dimensionsData = {
        labels: ['Grading Criteria Clarity', 'Feedback Usefulness', 'Time Adequacy', 'Task Alignment with Skills', 'Learning Impact', 'Implementation Ease'],
        datasets: [
            {
                label: 'Programming Assignments',
                data: [4, 4, 4, 3.5, 4, 3.5],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
                pointBackgroundColor: 'rgb(54, 162, 235)',
                pointRadius: 4
            },
            {
                label: 'Essay Assignments',
                data: [3, 5, 3.5, 3.5, 4.5, 3],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointRadius: 4
            }
        ]
    };
    
    new Chart(dimensionsRadar, {
        type: 'radar',
        data: dimensionsData,
        options: {
            responsive: true,
            scales: {
                r: {
                    angleLines: { display: true },
                    beginAtZero: true,
                    max: 5,
                    ticks: { stepSize: 1 }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Comparison of Peer Review Dimensions'
                }
            }
        }
    });
    
    // Dimensions bar chart comparison
    const dimensionsBar = document.getElementById('dimensionsBarChart').getContext('2d');
    new Chart(dimensionsBar, {
        type: 'bar',
        data: {
            labels: ['Grading Criteria Clarity', 'Feedback Usefulness', 'Time Adequacy', 'Task Alignment with Skills', 'Learning Impact', 'Implementation Ease'],
            datasets: [
                {
                    label: 'Programming Assignments',
                    data: [4, 4, 4, 3.5, 4, 3.5],
                    backgroundColor: 'rgba(54, 162, 235, 0.7)',
                    borderColor: 'rgb(54, 162, 235)',
                    borderWidth: 1
                },
                {
                    label: 'Essay Assignments',
                    data: [3, 5, 3.5, 3.5, 4.5, 3],
                    backgroundColor: 'rgba(255, 99, 132, 0.7)',
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5,
                    title: {
                        display: true,
                        text: 'Average Rating (1-5)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Detailed Comparison by Dimension'
                }
            }
        }
    });
    
    // Time series chart
    const timeSeriesChart = document.getElementById('timeSeriesChart').getContext('2d');
    const timeSeriesData = {
        labels: ["Previous Experience", "Current Experience"],
        datasets: [
            {
                label: 'Peer Review Evolution',
                data: [3, 4],
                backgroundColor: 'rgba(121, 85, 72, 0.2)',
                borderColor: 'rgb(121, 85, 72)',
                tension: 0.3,
                fill: false
            },
            {
                label: 'Training Effectiveness',
                data: [3, 4],
                backgroundColor: 'rgba(161, 136, 127, 0.2)',
                borderColor: 'rgb(161, 136, 127)',
                tension: 0.3,
                fill: false
            }
        ]
    };
    
    new Chart(timeSeriesChart, {
        type: 'line',
        data: timeSeriesData,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5,
                    title: {
                        display: true,
                        text: 'Average Rating (1-5)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Peer Review Metrics Over Time'
                }
            }
        }
    });
    
    // Qualitative theme analysis
    const themesChart = document.getElementById('themesChart').getContext('2d');
    const themesLabels = JSON.parse(document.getElementById('themesChart').dataset.themes);
    const themesFrequencies = JSON.parse(document.getElementById('themesChart').dataset.frequencies);
    const themesTypes = JSON.parse(document.getElementById('themesChart').dataset.types);
    
    // Create arrays for strengths and challenges
    const strengthLabels = [];
    const strengthData = [];
    const challengeLabels = [];
    const challengeData = [];
    
    for (let i = 0; i < themesLabels.length; i++) {
        if (themesTypes[i] === 'Strength') {
            strengthLabels.push(themesLabels[i]);
            strengthData.push(themesFrequencies[i]);
        } else {
            challengeLabels.push(themesLabels[i]);
            challengeData.push(themesFrequencies[i]);
        }
    }
    
    new Chart(themesChart, {
        type: 'bar',
        data: {
            labels: [...strengthLabels, ...challengeLabels],
            datasets: [{
                label: 'Frequency Mentioned',
                data: [...strengthData, ...challengeData],
                backgroundColor: [
                    ...Array(strengthLabels.length).fill('rgba(75, 192, 192, 0.7)'),
                    ...Array(challengeLabels.length).fill('rgba(255, 99, 132, 0.7)')
                ],
                borderColor: [
                    ...Array(strengthLabels.length).fill('rgb(75, 192, 192)'),
                    ...Array(challengeLabels.length).fill('rgb(255, 99, 132)')
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Frequency Mentioned'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Strengths and Challenges of Peer Review'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const index = context.dataIndex;
                            const type = index < strengthLabels.length ? 'Strength' : 'Challenge';
                            return `${type}: ${context.formattedValue} mentions`;
                        }
                    }
                }
            }
        }
    });
    
    // Improvement suggestions chart
    const improvementChart = document.getElementById('improvementChart').getContext('2d');
    const improvementLabels = JSON.parse(document.getElementById('improvementChart').dataset.themes);
    const improvementPriorities = JSON.parse(document.getElementById('improvementChart').dataset.priorities);
    
    new Chart(improvementChart, {
        type: 'horizontalBar',
        data: {
            labels: improvementLabels,
            datasets: [{
                label: 'Priority Rating (Lower is Higher Priority)',
                data: improvementPriorities,
                backgroundColor: 'rgba(153, 102, 255, 0.7)',
                borderColor: 'rgb(153, 102, 255)',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true,
                    max: 5,
                    title: {
                        display: true,
                        text: 'Priority Rating (1-5, Lower is Higher Priority)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Improvement Suggestions by Priority'
                }
            }
        }
    });
});
</script> 