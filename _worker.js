const quotes = [
  { quote: "The only thing we have to fear is fear itself.", author: "Franklin D. Roosevelt" },
  { quote: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { quote: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { quote: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
  { quote: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { quote: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
  { quote: "What you get by achieving your goals is not as important as what you become.", author: "Zig Ziglar" },
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
    .label {
      font-size: 0.9rem;
      color: #a78bfa;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 1.5rem;
    }
    .quote {
      font-size: 1.5rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    .author {
      font-size: 1rem;
      color: #94a3b8;
    }
    .btn {
      margin-top: 2rem;
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
  </style>
</head>
<body>
  <div class="card">
    <div class="label">✨ Daily Motivation</div>
    <div id="quote" class="quote"></div>
    <div id="author" class="author"></div>
    <button class="btn" onclick="showRandomQuote()">Next Quote 🔄</button>
  </div>

  <script>
    const quotes = ${JSON.stringify(quotes)};
    let currentIndex = -1;
    
    function showRandomQuote() {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * quotes.length);
      } while (newIndex === currentIndex && quotes.length > 1);
      
      currentIndex = newIndex;
      const q = quotes[currentIndex];
      document.getElementById('quote').textContent = '"' + q.quote + '"';
      document.getElementById('author').textContent = '— ' + q.author;
    }
    
    showRandomQuote();
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
