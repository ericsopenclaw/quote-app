const quotes = [
  { quote: "簡單的事情重複做，你就是專家。", author: "馬雲" },
  { quote: "機會是留給準備好的人。", author: "路易·巴斯德" },
  { quote: "保持飢餓，保持愚蠢。", author: "史蒂夫·賈伯斯" },
  { quote: "失敗是成功之母。", author: "愛迪生" },
  { quote: "唯一不變的就是變化本身。", author: "赫拉克利特" },
  { quote: "知識就是力量。", author: "弗朗西斯·培根" },
  { quote: "我思故我在。", author: "笛卡爾" },
  { quote: "醫學是科學，藝術是人。", author: "威廉·奧斯勒" },
  { quote: "有時候你必須先離開才能抵達。", author: "巴布·狄倫" },
  { quote: "不要問世界需要什麼，想想什麼會讓你活著。", author: "霍華德·瑟曼" },
];

// Static file content
const HTML = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>每日勵志語錄</title>
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
    .loading {
      font-size: 1.2rem;
      color: #a78bfa;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="label">✨ 每日語錄</div>
    <div id="quote" class="quote loading">載入中...</div>
    <div id="author" class="author"></div>
    <button class="btn" onclick="fetchQuote()">換一則 🔄</button>
  </div>

  <script>
    const API_URL = '/api/quotes';
    
    async function fetchQuote() {
      const quoteEl = document.getElementById('quote');
      const authorEl = document.getElementById('author');
      quoteEl.textContent = '載入中...';
      quoteEl.className = 'quote loading';
      authorEl.textContent = '';
      
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        quoteEl.textContent = '"' + data.quote + '"';
        quoteEl.className = 'quote';
        authorEl.textContent = '— ' + data.author;
      } catch (e) {
        quoteEl.textContent = '載入失敗，請稍後再試';
        quoteEl.className = 'quote';
      }
    }
    
    fetchQuote();
  </script>
</body>
</html>`;

async function handleApi(request) {
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  return new Response(JSON.stringify(random), {
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

async function handleRequest(request) {
  const url = new URL(request.url);
  
  // API route
  if (url.pathname === '/api/quotes') {
    return handleApi(request);
  }
  
  // Serve HTML for root
  return new Response(HTML, {
    headers: { 'Content-Type': 'text/html;charset=utf-8' }
  });
}

export default {
  async fetch(request, env, ctx) {
    return handleRequest(request);
  }
};
