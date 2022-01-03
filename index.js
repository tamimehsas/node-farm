const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const pathName = req.url;
    if (pathName === '/' || pathName === '/overview') {
        res.end('Overview page');
    } else if (pathName === '/product') {
        res.end('Product Page');
    } else if (pathName === '/api') {
        fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
            const productData = JSON.parse(data);
            console.log(productData);
        });
        res.end('API');

    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html',
            'my-header': 'boom boom'
        });
    }
    res.end(`<h1 style="color:red;text-align:center">Page Not Found !!</h1>`)
});

server.listen(8090, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
});