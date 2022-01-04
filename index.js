const http = require('http');
const url = require('url');
const fs = require('fs');

const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;
    if (pathName === '/' || pathName === '/overview') {
        res.end('Overview page');
    } else if (pathName === '/product') {
        res.end('Product Page');
    } else if (pathName === '/api') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);

    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html',
            'my-header': 'boom boom'
        });
        res.end(`<h1 style="color:red;text-align:center">Page Not Found !!</h1>`)

    }
});

server.listen(8090, '127.0.0.1', () => {
    console.log('Listening to requests on port 8090');
});