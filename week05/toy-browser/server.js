const http = require("http")

const server = http.createServer((req, res) => {
  console.log('---------req-start')
  console.log(req.headers)
  console.log(req.method)
  console.log('---------req-end')
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('ok');
});

server.listen(8080)