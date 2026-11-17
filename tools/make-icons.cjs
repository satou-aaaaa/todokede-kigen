// アプリのアイコン（icon-192.png・icon-512.png）を作る。紺の地に、炎・しずく・粒の3つの形（燃える物・液体・固体）。
// 使い方: node tools/make-icons.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of [192, 512]) {
    const p = await b.newPage({ viewport: { width: s, height: s } });
    await p.setContent(`<body style="margin:0"><svg width="${s}" height="${s}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#123554"/>
      <path d="M50 14 C62 32 72 42 72 60 A22 22 0 0 1 28 60 C28 46 38 40 40 28 C44 36 46 40 50 42 C52 34 52 24 50 14 Z" fill="#f2a43a"/>
      <path d="M50 46 C56 56 60 60 60 67 A10 10 0 0 1 40 67 C40 60 44 56 50 46 Z" fill="#f6d77a"/>
      <circle cx="18" cy="80" r="6" fill="#8fb8de"/><rect x="76" y="74" width="12" height="12" fill="#fffdf7"/></svg></body>`);
    await p.screenshot({ path: path.join(__dirname, "..", `icon-${s}.png`), clip: { x: 0, y: 0, width: s, height: s } });
  }
  await b.close();
})();
