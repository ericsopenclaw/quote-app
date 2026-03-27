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
  <title>Daily Motivation</title>
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
    .card {
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 3rem;
      max-width: 600px;
      text-align: center;
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
      border: 1px solid rgba(255,255,255,0.1);
    }
    .quote {
      font-size: 1.5rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    .author {
      font-size: 1rem;
      color: #94a3b8;
      margin-bottom: 2rem;
    }
    .btn {
      padding: 0.8rem 2rem;
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
      margin-left: 0.5rem;
    }
    .btn-outline:hover {
      background: rgba(255,255,255,0.1);
    }
    .source {
      font-size: 0.8rem;
      color: #a78bfa;
      margin-bottom: 1rem;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="source" id="source">📚 Local Quote</div>
    <div id="quote" class="quote"></div>
    <div id="author" class="author"></div>
    <button class="btn" onclick="getRandom()">🎲 New Quote</button>
  </div>

  <script>
    const localQuotes = ${JSON.stringify(localQuotes)};
    let currentQuote = null;
    
    function getRandom() {
      document.getElementById('source').textContent = '📚 Local Quote';
      const idx = Math.floor(Math.random() * localQuotes.length);
      currentQuote = localQuotes[idx];
      document.getElementById('quote').textContent = '"' + currentQuote.q + '"';
      document.getElementById('author').textContent = '— ' + currentQuote.a;
    }
    
    async function getOnline() {
      document.getElementById('source').textContent = '🌐 Loading...';
      try {
        const res = await fetch('https://zenquotes.io/api/random');
        const data = await res.json();
        currentQuote = data[0];
        document.getElementById('quote').textContent = '"' + currentQuote.q + '"';
        document.getElementById('author').textContent = '— ' + currentQuote.a;
        document.getElementById('source').textContent = '🌐 Online Quote';
      } catch (e) {
        document.getElementById('source').textContent = '❌ Failed';
      }
    }
    
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
