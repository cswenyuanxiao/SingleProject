// static/js/radar-chart.js
document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("radarChart");
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const categories = JSON.parse(canvas.dataset.labels);
    const datasetsData = JSON.parse(canvas.dataset.datasets);
    
    // Create the datasets array with proper formatting
    const datasets = datasetsData.map(dataset => ({
      label: dataset.label,
      data: dataset.data,
      backgroundColor: `${dataset.color}20`, // Add transparency
      borderColor: dataset.color,
      borderWidth: 2,
      pointBackgroundColor: dataset.color
    }));
    
    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: categories,
        datasets: datasets
      },
      options: {
        scales: {
          r: {
            angleLines: {
              display: true
            },
            suggestedMin: 0,
            suggestedMax: 100
          }
        }
      }
    });
  });