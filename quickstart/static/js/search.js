document.addEventListener("DOMContentLoaded", async function() {
    // 获取用户在URL query中的搜索词
    const params = new URLSearchParams(window.location.search);
    const query = params.get("query");
    if (!query) {
      return; // 用户没输入搜索
    }
  
    const resultsContainer = document.getElementById("search-results");
    resultsContainer.innerHTML = "<p>Searching for: <strong>" + query + "</strong></p>";
  
    try {
      // 1. Fetch index.json
      const response = await fetch("/index.json");
      const jsonData = await response.json();
  
      // 2. Build lunr index
      const idx = lunr(function () {
        this.ref("url");
        this.field("title");
        this.field("content");
  
        jsonData.forEach(function (doc) {
          this.add(doc);
        }, this);
      });
  
      // 3. Perform search
      const lunrResults = idx.search(query);
  
      // 4. Build results
      if (lunrResults.length > 0) {
        let html = "<ul>";
        lunrResults.forEach(function (r) {
          // ref 就是 url
          const item = jsonData.find(d => d.url === r.ref);
          if (item) {
            html += `<li>
              <a href="${item.url}">${item.title}</a><br>
              ${snippet(item.content, query)}
            </li>`;
          }
        });
        html += "</ul>";
        resultsContainer.innerHTML += html;
      } else {
        resultsContainer.innerHTML += "<p>No results found.</p>";
      }
    } catch (err) {
      console.error(err);
      resultsContainer.innerHTML += "<p>Error searching content.</p>";
    }
  });
  
  // 仅做示例，用 highlight/snippet 的方式
  function snippet(content, query) {
    const loc = content.toLowerCase().indexOf(query.toLowerCase());
    if (loc < 0) return content.substring(0, 150) + "...";
    const start = Math.max(0, loc - 50);
    const end = Math.min(content.length, loc + 50);
    return "... " + content.substring(start, end) + " ...";
  }
  