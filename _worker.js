const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quote Search</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
      color: #fff;
      padding: 2rem;
    }
    .container {
      width: 100%;
      max-width: 700px;
    }
    .search-box {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }
    input {
      flex: 1;
      padding: 0.8rem 1.2rem;
      font-size: 1rem;
      border: none;
      border-radius: 50px;
      background: rgba(255,255,255,0.1);
      color: #fff;
      outline: none;
      border: 1px solid rgba(255,255,255,0.2);
    }
    input::placeholder {
      color: #94a3b8;
    }
    input:focus {
      border-color: #a78bfa;
    }
    .btn {
      padding: 0.8rem 1.5rem;
      font-size: 1rem;
      border: none;
      border-radius: 50px;
      background: linear-gradient(135deg, #a78bfa, #7c3aed);
      color: white;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(167, 139, 250, 0.4);
    }
    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .card {
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 2rem;
      text-align: center;
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
      border: 1px solid rgba(255,255,255,0.1);
    }
    .quote {
      font-size: 1.4rem;
      line-height: 1.6;
      margin-bottom: 1rem;
    }
    .author {
      font-size: 1rem;
      color: #94a3b8;
      margin-bottom: 1.5rem;
    }
    .actions {
      display: flex;
      gap: 0.5rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    .btn-small {
      padding: 0.5rem 1rem;
      font-size: 0.85rem;
      border: none;
      border-radius: 50px;
      background: rgba(255,255,255,0.1);
      color: #a78bfa;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn-small:hover {
      background: rgba(167, 139, 250, 0.2);
    }
    .results-info {
      margin: 1rem 0;
      color: #94a3b8;
      font-size: 0.9rem;
    }
    .loading {
      color: #a78bfa;
      font-size: 1.2rem;
    }
    .error {
      color: #f87171;
    }
    .hidden {
      display: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="search-box">
      <input type="text" id="searchInput" placeholder="Search quotes... (e.g. love, life, success)" onkeypress="if(event.key==='Enter')search()">
      <button class="btn" id="searchBtn" onclick="search()">Search 🔍</button>
      <button class="btn" id="randomBtn" onclick="getRandom()">Random 🎲</button>
    </div>
    
    <div id="resultsInfo" class="results-info hidden"></div>
    
    <div class="card">
      <div id="loading" class="loading hidden">Loading...</div>
      <div id="error" class="error hidden"></div>
      <div id="quoteContent">
        <div id="quote" class="quote"></div>
        <div id="author" class="author"></div>
        <div id="actions" class="actions hidden">
          <button class="btn-small" onclick="copyQuote()">📋 Copy</button>
          <button class="btn-small" onclick="tweetQuote()">🐦 Tweet</button>
          <button class="btn-small" onclick="getRandom()">🔄 Another</button>
        </div>
      </div>
    </div>
  </div>

  <script>
    const API_URL = 'https://api.quotable.io';
    let currentQuote = null;
    
    async function fetchQuote(url) {
      showLoading(true);
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        
        if (data.results) {
          // Search results
          if (data.results.length === 0) {
            showError('No quotes found. Try different keywords.');
            return;
          }
          currentQuote = data.results[0];
          showResultsInfo(data.total + ' quotes found');
        } else {
          // Single quote
          currentQuote = data;
          hideResultsInfo();
        }
        
        displayQuote(currentQuote);
      } catch (e) {
        showError('Failed to fetch quote. Please try again.');
      }
      showLoading(false);
    }
    
    function search() {
      const query = document.getElementById('searchInput').value.trim();
      if (!query) return;
      fetchQuote(\`\${API_URL}/search?query=\${encodeURIComponent(query)}\`);
    }
    
    function getRandom() {
      document.getElementById('searchInput').value = '';
      hideResultsInfo();
      fetchQuote(\`\${API_URL}/random\`);
    }
    
    function displayQuote(q) {
      document.getElementById('quote').textContent = '"' + q.content + '"';
      document.getElementById('author').textContent = '— ' + (q.author || 'Unknown');
      document.getElementById('actions').classList.remove('hidden');
    }
    
    function copyQuote() {
      if (!currentQuote) return;
      const text = '"' + currentQuote.content + '" — ' + currentQuote.author;
      navigator.clipboard.writeText(text).then(() => {
        alert('Copied!');
      });
    }
    
    function tweetQuote() {
      if (!currentQuote) return;
      const text = '"' + currentQuote.content + '" — ' + currentQuote.author;
      const url = \`https://twitter.com/intent/tweet?text=\${encodeURIComponent(text)}\`;
      window.open(url, '_blank');
    }
    
    function showLoading(show) {
      document.getElementById('loading').classList.toggle('hidden', !show);
      document.getElementById('quoteContent').classList.toggle('hidden', show);
    }
    
    function showError(msg) {
      document.getElementById('error').textContent = msg;
      document.getElementById('error').classList.remove('hidden');
      document.getElementById('quoteContent').classList.add('hidden');
    }
    
    function showResultsInfo(msg) {
      document.getElementById('resultsInfo').textContent = msg;
      document.getElementById('resultsInfo').classList.remove('hidden');
    }
    
    function hideResultsInfo() {
      document.getElementById('resultsInfo').classList.add('hidden');
    }
    
    // Load random quote on start
    getRandom();
  </script>
</body>
</html>`;

export default {
  async fetch(request, env, ctx) {
    return new Response(HTML, {
      headers: { 'Content-Type': 'text/html;charset=utf-8' }
    });
  }
};
