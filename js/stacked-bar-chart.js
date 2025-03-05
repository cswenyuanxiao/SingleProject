document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("stackedBarChart");
  if (!canvas) {
    console.error("Canvas element 'stackedBarChart' not found!");
    return;
  }
  
  const ctx = canvas.getContext('2d');
  const labels = JSON.parse(canvas.dataset.labels);
  const datasetsData = JSON.parse(canvas.dataset.datasets);
  
  // Create the datasets array with Chart.js formatting
  const datasets = datasetsData.map(dataset => ({
    label: dataset.label,
    data: dataset.data,
    backgroundColor: dataset.color,
    borderColor: dataset.color.replace(/[^,]+(?=\))/, "1"),
    borderWidth: 1
  }));
  
  // Create the chart
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: datasets
    },
    options: {
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
          beginAtZero: true
        }
      }
    }
  });
});