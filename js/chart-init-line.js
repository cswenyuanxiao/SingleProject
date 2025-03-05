document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById("peerReviewChart");
    if (!ctx) {
        console.error("Canvas element 'peerReviewChart' not found!");
        return;
    }

    // Function to adjust chart on window resize
    const createResponsiveChart = () => {
        // Clear any existing chart
        if (window.peerReviewLineChart) {
            window.peerReviewLineChart.destroy();
        }
        
        // Create new chart with responsive options
        window.peerReviewLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: JSON.parse(ctx.dataset.labels),
                datasets: [
                    {
                        label: 'AI-generated Score',
                        data: JSON.parse(ctx.dataset.ai),
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        tension: 0.1,
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                        pointRadius: 4,
                        pointHoverRadius: 6
                    },
                    {
                        label: 'Human-written Score',
                        data: JSON.parse(ctx.dataset.human),
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        tension: 0.1,
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                        pointRadius: 4,
                        pointHoverRadius: 6
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        titleFont: {
                            size: 14,
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 13
                        },
                        padding: 10,
                        cornerRadius: 4
                    },
                    legend: {
                        position: 'top',
                        labels: {
                            padding: 15,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    title: {
                        display: false,
                        text: 'AI vs Human Scoring Comparison',
                        font: {
                            size: 16
                        }
                    }
                },
                scales: {
                    y: { 
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        title: {
                            display: true,
                            text: 'Score',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        },
                        ticks: {
                            precision: 0
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        title: {
                            display: true,
                            text: 'Test',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                },
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart'
                }
            }
        });
        
        // Adjust container height
        const container = ctx.parentElement;
        if (container) {
            container.style.height = window.innerWidth < 768 ? '300px' : '400px';
        }
    };
    
    // Create initial chart
    createResponsiveChart();
    
    // Resize chart when window size changes
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(createResponsiveChart, 250);
    });
});