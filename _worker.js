const localQuotes = [
  { q: "The only thing we have to fear is fear itself.", a: "Franklin D. Roosevelt" },
  { q: "Stay hungry, stay foolish.", a: "Steve Jobs" },
  { q: "In the middle of difficulty lies opportunity.", a: "Albert Einstein" },
  { q: "The future belongs to those who believe in the beauty of their dreams.", a: "Eleanor Roosevelt" },
  { q: "It is during our darkest moments that we must focus to see the light.", a: "Aristotle" },
  { q: "The best time to plant a tree was 20 years ago. The second best time is now.", a: "Chinese Proverb" },
  { q: "Success is not final, failure is not fatal: it is the courage to continue that counts.", a: "Winston Churchill" },
  { q: "Believe you can and you're halfway there.", a: "Theodore Roosevelt" },
  { q: "The only impossible journey is the one you never begin.", a: "Tony Robbins" },
  { q: "What you get by achieving your goals is not as important as what you become.", a: "Zig Ziglar" },
  { q: "Life is what happens when you're busy making other plans.", a: "John Lennon" },
  { q: "The way to get started is to quit talking and begin doing.", a: "Walt Disney" },
  { q: "If life were predictable it would cease to be life, and be without flavor.", a: "Eleanor Roosevelt" },
  { q: "In the end, it's not the years in your life that count. It's the life in your years.", a: "Abraham Lincoln" },
  { q: "You only live once, but if you do it right, once is enough.", a: "Mae West" },
  { q: "Many of life's failures are people who did not realize how close they were to success when they gave up.", a: "Thomas Edison" },
  { q: "If you look at what you have in life, you'll always have more.", a: "Oprah Winfrey" },
  { q: "The only way to do great work is to love what you do.", a: "Steve Jobs" },
  { q: "Don't watch the clock; do what it does. Keep going.", a: "Sam Levenson" },
  { q: "Love all, trust a few, do wrong to none.", a: "William Shakespeare" },
];

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
      flex-wrap: wrap;
    }
    input {
      flex: 1;
      min-width: 200px;
      padding: 0.8rem 1.2rem;
      font-size: 1rem;
      border: none;
      border-radius: 50px;
      background: rgba(255,255,255,0.1);
      color: #fff;
      outline: none;
      border: 1px solid rgba(255,255,255,0.2);
    }
    input::placeholder { color: #94a3b8; }
    input:focus { border-color: #a78bfa; }
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
    .btn-outline {
      background: transparent;
      border: 1px solid rgba(255,255,255,0.2);
    }
    .btn-outline:hover {
      background: rgba(255,255,255,0.1);
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
    .btn-small:hover { background: rgba(167, 139, 250, 0.2); }
    .loading { color: #a78bfa; font-size: 1.2rem; }
    .error { color: #f87171; }
    .hidden { display: none; }
    .tag {
      display: inline-block;
      padding: 0.3rem 0.8rem;
      background: rgba(167, 139, 250, 0.2);
      border-radius: 20px;
      font-size: 0.8rem;
      color: #a78bfa;
      margin: 0.25rem;
      cursor: pointer;
    }
    .tag:hover { background: rgba(167, 139, 250, 0.4); }
    .source-tag {
      background: rgba(16, 185, 129, 0.2);
      color: #34d399;
      font-size: 0.75rem;
      margin-bottom: 1rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="search-box">
      <input type="text" id="searchInput" placeholder="Search quotes... (e.g. love, life, success)" onkeypress="if(event.key==='Enter')searchLocal()">
      <button class="btn" onclick="searchLocal()">Search 🔍</button>
      <button class="btn btn-outline" onclick="getOnline()">Online 🎲</button>
      <button class="btn btn-outline" onclick="getRandom()">Local 🎲</button>
    </div>
    
    <div id="tags" style="text-align:center; margin-bottom: 1rem;"></div>
    
    <div class="card">
      <div id="loading" class="loading hidden">Loading...</div>
      <div id="error" class="error hidden"></div>
      <div id="quoteContent">
        <div id="sourceTag" class="source-tag hidden">Local Quote</div>
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
    const localQuotes = ${JSON.stringify(localQuotes)};
    let currentQuote = null;
    let searchMode = 'local';
    
    function init() {
      renderTags();
      getRandom();
    }
    
    function renderTags() {
      const tags = ['love', 'life', 'success', 'time', 'dreams', 'courage'];
      const container = document.getElementById('tags');
      container.innerHTML = tags.map(t => \`<span class="tag" onclick="document.getElementById('searchInput').value='\${t}';searchLocal()">\${t}</span>\`).join('');
    }
    
    function searchLocal() {
      const query = document.getElementById('searchInput').value.trim().toLowerCase();
      if (!query) { getRandom(); return; }
      
      const results = localQuotes.filter(q => 
        q.q.toLowerCase().includes(query) || q.a.toLowerCase().includes(query)
      );
      
      if (results.length === 0) {
        showError('No quotes found. Try: love, life, success, dreams...');
        return;
      }
      
      currentQuote = results[Math.floor(Math.random() * results.length)];
      displayQuote(currentQuote, 'Local');
    }
    
    async function getOnline() {
      searchMode = 'online';
      document.getElementById('sourceTag').textContent = '🌐 Online Quote';
      document.getElementById('sourceTag').classList.remove('hidden');
      showLoading(true);
      
      try {
        const res = await fetch('https://zenquotes.io/api/random');
        const data = await res.json();
        currentQuote = data[0];
        displayQuote(currentQuote, '🌐 Online');
      } catch (e) {
        showError('Online fetch failed. Try again!');
      }
      showLoading(false);
    }
    
    function getRandom() {
      searchMode = 'local';
      const idx = Math.floor(Math.random() * localQuotes.length);
      currentQuote = localQuotes[idx];
      displayQuote(currentQuote, 'Local');
    }
    
    function displayQuote(q, source) {
      document.getElementById('quote').textContent = '"' + q.q + '"';
      document.getElementById('author').textContent = '— ' + q.a;
      document.getElementById('sourceTag').textContent = source === 'Local' ? '📚 Local Quote' : '🌐 Online Quote';
      document.getElementById('sourceTag').classList.remove('hidden');
      document.getElementById('actions').classList.remove('hidden');
      document.getElementById('error').classList.add('hidden');
      document.getElementById('quoteContent').classList.remove('hidden');
    }
    
    function copyQuote() {
      if (!currentQuote) return;
      const text = '"' + currentQuote.q + '" — ' + currentQuote.a;
      navigator.clipboard.writeText(text);
    }
    
    function tweetQuote() {
      if (!currentQuote) return;
      const text = '"' + currentQuote.q + '" — ' + currentQuote.a;
      window.open(\`https://twitter.com/intent/tweet?text=\${encodeURIComponent(text)}\`, '_blank');
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
    
    init();
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
