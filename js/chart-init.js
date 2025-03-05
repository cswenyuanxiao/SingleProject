document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById("peerReviewChart");

    if (!ctx) {
        console.error("Canvas element 'peerReviewChart' not found!");
        return;
    }

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: JSON.parse(ctx.dataset.labels),
            datasets: [
                {
                    label: 'Coding Review Scores',
                    data: JSON.parse(ctx.dataset.coding),
                    backgroundColor: 'rgba(54, 162, 235, 0.5)'
                },
                {
                    label: 'Essay Review Scores',
                    data: JSON.parse(ctx.dataset.essay),
                    backgroundColor: 'rgba(255, 99, 132, 0.5)'
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
