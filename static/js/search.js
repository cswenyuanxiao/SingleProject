// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables for search
    let searchIndex = null;
    const searchInput = document.querySelector('input[type="search"]');
    const searchForm = document.querySelector('form[action="/search"]');
    const searchResults = document.getElementById('search-results');
  
    // Only proceed if we're on a page with search functionality
    if (searchForm && searchInput) {
        // Fetch the search index
        fetch('/index.json')
            .then(response => response.json())
            .then(data => {
                // Initialize lunr with the JSON data
                searchIndex = lunr(function() {
                    // Define search fields and their boost values
                    this.field('title', { boost: 10 });
                    this.field('content');
                    this.field('summary', { boost: 5 });
                    this.field('section', { boost: 3 });
                    
                    // Add a reference field
                    this.ref('permalink');
                    
                    // Add each page to the index
                    data.forEach(page => {
                        this.add(page);
                    });
                });
                
                // Store the original data for displaying results
                window.searchData = data;
                
                // Check if there's a search query in the URL
                const urlParams = new URLSearchParams(window.location.search);
                const query = urlParams.get('q');
                
                if (query && searchResults) {
                    // Fill the search input with the query
                    searchInput.value = query;
                    // Perform the search
                    performSearch(query);
                }
            })
            .catch(error => console.error('Error loading search index:', error));
        
        // Handle the search form submission
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchInput.value.trim();
            
            if (query) {
                // Redirect to the search page with the query
                window.location.href = `/search?q=${encodeURIComponent(query)}`;
            }
        });
    }
    
    // Function to perform the search and display results
    function performSearch(query) {
        if (!searchIndex || !searchResults) return;
        
        // Clear previous results
        searchResults.innerHTML = '';
        
        try {
            // Tokenize the query for better matching
            const queryTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 2);
            
            // Perform the search with better error handling
            let results;
            try {
                // Try exact search first
                results = searchIndex.search(query);
                
                // If no results, try a more flexible search with individual terms
                if (results.length === 0 && queryTerms.length > 1) {
                    results = searchIndex.search(queryTerms.map(term => `${term}*`).join(' '));
                }
            } catch (e) {
                // If the search query syntax is invalid, try a simpler approach
                console.warn("Search syntax error, trying simpler approach:", e);
                results = queryTerms.length > 0 
                    ? searchIndex.search(queryTerms[0] + "*") 
                    : [];
            }
            
            // Create the results header
            const resultsHeader = document.createElement('h2');
            resultsHeader.textContent = `Search Results for "${query}"`;
            searchResults.appendChild(resultsHeader);
            
            if (results.length === 0) {
                // No results found
                const noResults = document.createElement('p');
                noResults.textContent = 'No results found. Try different keywords or check your spelling.';
                searchResults.appendChild(noResults);
                
                // Add some search suggestions if possible
                if (window.searchData && window.searchData.length > 0) {
                    const suggestions = document.createElement('div');
                    suggestions.innerHTML = '<h4>You might be interested in:</h4>';
                    const suggestionsList = document.createElement('ul');
                    
                    // Get 3 random items from the search data
                    const randomEntries = [];
                    const dataLength = window.searchData.length;
                    for (let i = 0; i < Math.min(3, dataLength); i++) {
                        const randomIndex = Math.floor(Math.random() * dataLength);
                        randomEntries.push(window.searchData[randomIndex]);
                    }
                    
                    randomEntries.forEach(entry => {
                        const item = document.createElement('li');
                        const link = document.createElement('a');
                        link.href = entry.permalink;
                        link.textContent = entry.title;
                        item.appendChild(link);
                        suggestionsList.appendChild(item);
                    });
                    
                    suggestions.appendChild(suggestionsList);
                    searchResults.appendChild(suggestions);
                }
            } else {
                // Results found - create a container
                const resultsContainer = document.createElement('div');
                resultsContainer.className = 'row mt-4';
                
                // Add a result count
                const resultCount = document.createElement('p');
                resultCount.className = 'mb-4';
                resultCount.textContent = `Found ${results.length} result${results.length !== 1 ? 's' : ''}`;
                searchResults.appendChild(resultCount);
                
                // Process each result
                results.forEach(result => {
                    // Find the original data
                    const page = window.searchData.find(page => page.permalink === result.ref);
                    if (!page) return;
                    
                    // Create a card for each result
                    const col = document.createElement('div');
                    col.className = 'col-md-6 mb-4';
                    
                    col.innerHTML = `
                        <div class="card shadow-sm">
                            <div class="card-body">
                                <h5 class="card-title">
                                    <a href="${page.permalink}" class="text-decoration-none">${page.title}</a>
                                </h5>
                                <p class="card-text">
                                    <small class="text-muted">${page.date} · ${page.section.charAt(0).toUpperCase() + page.section.slice(1)}</small>
                                </p>
                                <p class="card-text">${page.summary}</p>
                                <a href="${page.permalink}" class="btn btn-outline-primary">Read More</a>
                            </div>
                        </div>
                    `;
                    
                    resultsContainer.appendChild(col);
                });
                
                // Add all results to the page
                searchResults.appendChild(resultsContainer);
            }
        } catch (e) {
            console.error('Search error:', e);
            const errorMsg = document.createElement('p');
            errorMsg.textContent = 'An error occurred while searching. Please try again.';
            searchResults.appendChild(errorMsg);
        }
    }
  });