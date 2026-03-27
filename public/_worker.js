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

async function handleApi(request) {
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  return new Response(JSON.stringify(random), {
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

async function handleStatic(request, env, ctx) {
  return env.ASSETS.fetch(request);
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    if (url.pathname === '/api/quotes') {
      return handleApi(request);
    }
    
    return handleStatic(request, env, ctx);
  }
};
