const http = require('http');
const url = require('url');
const fs = require('fs');
const replaceTemplate = require('./modules/replaceTemplate');




const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);
    // OVERVIEW
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%TEMPLATE-CARDS%}', cardsHtml);
        res.end(output);

        // PRODUCT
    } else if (pathname === '/product') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);

        // API
    } else if (pathname === '/api') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);

        // API
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