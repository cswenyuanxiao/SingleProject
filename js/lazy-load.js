document.addEventListener("DOMContentLoaded", function() {
    // Helper function to determine if an element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Helper function to load a script
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    }
    
    // Lazy loading for charts
    const lazyCharts = document.querySelectorAll('[data-lazy-chart]');
    
    if ('IntersectionObserver' in window) {
        const chartObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const container = entry.target;
                    const chartType = container.dataset.lazyChart;
                    const chartId = container.dataset.chartId || 'chart-' + Math.random().toString(36).substring(2, 9);
                    
                    // Create canvas element if it doesn't exist
                    if (!container.querySelector('canvas')) {
                        const canvas = document.createElement('canvas');
                        canvas.id = chartId;
                        canvas.setAttribute('width', 400);
                        canvas.setAttribute('height', 200);
                        
                        // Copy data attributes from container to canvas
                        Array.from(container.attributes)
                            .filter(attr => attr.name.startsWith('data-'))
                            .forEach(attr => {
                                canvas.setAttribute(attr.name, attr.value);
                            });
                        
                        container.appendChild(canvas);
                    }
                    
                    // Load and initialize the chart
                    loadScript(`/js/chart-init-${chartType}.js`)
                        .then(() => {
                            console.log(`Chart ${chartId} loaded and initialized`);
                        })
                        .catch(error => {
                            console.error(`Failed to load chart script: ${error}`);
                        });
                    
                    // Stop observing once loaded
                    observer.unobserve(container);
                }
            });
        }, {
            rootMargin: '100px', // Load when within 100px of viewport
            threshold: 0.1
        });
        
        lazyCharts.forEach(chart => chartObserver.observe(chart));
    } else {
        // Fallback for browsers without intersection observer
        lazyCharts.forEach(container => {
            const chartType = container.dataset.lazyChart;
            const chartId = container.dataset.chartId || 'chart-' + Math.random().toString(36).substring(2, 9);
            
            // Create canvas if needed
            if (!container.querySelector('canvas')) {
                const canvas = document.createElement('canvas');
                canvas.id = chartId;
                
                // Copy data attributes from container to canvas
                Array.from(container.attributes)
                    .filter(attr => attr.name.startsWith('data-'))
                    .forEach(attr => {
                        canvas.setAttribute(attr.name, attr.value);
                    });
                
                container.appendChild(canvas);
            }
            
            // Load script anyway
            loadScript(`/js/chart-init-${chartType}.js`).catch(console.error);
        });
    }
    
    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    
                    // Add a fade-in effect
                    img.style.opacity = 0;
                    img.onload = function() {
                        img.style.transition = 'opacity 0.5s ease-in-out';
                        img.style.opacity = 1;
                    };
                    
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(image => imageObserver.observe(image));
    } else {
        // Fallback for browsers without intersection observer
        lazyImages.forEach(image => {
            // Check if the image is already in viewport on page load
            if (isElementInViewport(image)) {
                image.src = image.dataset.src;
                image.removeAttribute('data-src');
            } else {
                // Otherwise, load on scroll (less efficient)
                window.addEventListener('scroll', function lazyLoad() {
                    if (isElementInViewport(image) && image.dataset.src) {
                        image.src = image.dataset.src;
                        image.removeAttribute('data-src');
                        window.removeEventListener('scroll', lazyLoad);
                    }
                });
            }
        });
    }
    
    // Add a small spinner for loading content
    const spinnerHTML = `
        <div class="spinner-container" style="display: flex; justify-content: center; margin: 20px 0;">
            <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    `;
    
    // Add spinners to containers until content loads
    lazyCharts.forEach(container => {
        if (!container.querySelector('canvas') && !container.querySelector('.spinner-container')) {
            const spinnerElement = document.createElement('div');
            spinnerElement.innerHTML = spinnerHTML;
            container.appendChild(spinnerElement.firstElementChild);
        }
    });
    
    // Add a helper class to body when page is fully loaded
    window.addEventListener('load', function() {
        document.body.classList.add('page-loaded');
        
        // Remove spinners when page is fully loaded
        document.querySelectorAll('.spinner-container').forEach(spinner => {
            spinner.style.display = 'none';
        });
    });
});