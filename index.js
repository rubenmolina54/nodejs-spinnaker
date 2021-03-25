const http = require('http');
const qs = require("querystring");
const url = require('url');
const fs = require('fs');

const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {

    if (req.method !== 'GET') handleError(405, res);

    const {pathname, query} = url.parse(req.url);
    if (pathname === '/var') {
        const {name} = qs.parse(query);
        fs.readFile(`/configmap/${name}`, 'utf8', function (err,data) {
            if (err) {
              res.end(`<h1>${name}: NO existe esta variable</h1>`)
            }
            res.end(`<h1>Pod inicializado el ${process.env['FECHA_INICIO']}<br><br><h1> - ${name}: ${data}</h1>`);
          });
    }
    let envs = "";
    let env = process.env;
    Object.keys(env).forEach(function(key) {
        envs += '<br>export ' + key + '="' + env[key] +'" <br> ';
      });

    if (pathname === '/') {
        res.end(`<h1>${envs}</h1>`);
    }
});

function handleError(code, res) {
    res.statusCode = code;
    res.end(`{"error": "${http.STATUS_CODES[code]}"}`);
}

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});