/**
 * ==============================================================================
 * ISLAMI.CO - LOCAL DEVELOPMENT STATIC SERVER
 * ==============================================================================
 * Server ini dapat dijalankan langsung dengan:
 * 1. Bun:  `bun run dev` (atau `bun server.js`) - Super Cepat!
 * 2. Node: `npm run serve:node` (atau `node server.js`)
 * ==============================================================================
 */

const PORT = process.env.PORT || 3000;

// 1. Deteksi Bun Runtime (Zero Configuration Native Bun Server)
if (typeof Bun !== 'undefined') {
  console.log(`\x1b[33m⚡ Running on Bun Runtime v${Bun.version}...\x1b[0m`);
  
  Bun.serve({
    port: PORT,
    fetch(req) {
      const url = new URL(req.url);
      let pathname = url.pathname;
      if (pathname === '/') pathname = '/index.html';

      const filePath = `.${pathname}`;
      const file = Bun.file(filePath);

      return file.exists().then(exists => {
        if (!exists) {
          return new Response("404 File Not Found - Islami.co", { status: 404 });
        }
        return new Response(file, {
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache"
          }
        });
      });
    }
  });

  console.log(`\x1b[32m✔ Server Islami.co siap di http://localhost:${PORT}\x1b[0m`);
} 
// 2. Fallback Native Node.js Server jika dijalankan dengan Node
else {
  const http = require('http');
  const fs = require('fs');
  const path = require('path');

  const MIME_TYPES = {
    '.html': 'text/html; charset=UTF-8',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.ico': 'image/x-icon',
    '.mp3': 'audio/mpeg'
  };

  const server = http.createServer((req, res) => {
    const cleanUrl = req.url.split('?')[0];
    let filePath = path.join(__dirname, cleanUrl === '/' ? 'index.html' : cleanUrl);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code === 'ENOENT') {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 File Not Found - Islami.co');
        } else {
          res.writeHead(500);
          res.end(`Server Error: ${err.code}`);
        }
      } else {
        res.writeHead(200, { 
          'Content-Type': contentType,
          'Cache-Control': 'no-cache, no-store, must-revalidate, proxy-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0'
        });
        res.end(content, 'utf-8');
      }
    });
  });

  server.listen(PORT, () => {
    console.log(`\x1b[32m✔ Server Islami.co (Node.js) berjalan di http://localhost:${PORT}\x1b[0m`);
  });
}

