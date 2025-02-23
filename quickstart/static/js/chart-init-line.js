document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById("peerReviewChart");
    if (!ctx) {
        console.error("Canvas element 'peerReviewChart' not found!");
        return;
    }

    new Chart(ctx, {
        type: 'line',  // turn bar into line
        data: {
            labels: JSON.parse(ctx.dataset.labels),
            datasets: [
                {
                    label: 'AI-generated Score',
                    data: JSON.parse(ctx.dataset.ai),
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)'
                },
                {
                    label: 'Human-written Score',
                    data: JSON.parse(ctx.dataset.human),
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)'
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
});
