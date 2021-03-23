const http = require('http');
const qs = require("querystring");
const url = require('url');
const fs = require('fs');

const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {

    if (req.method !== 'GET') handleError(405, res);

    const {pathname, query} = url.parse(req.url);
    // console.log(pathname, query);

    if (pathname === '/var') {
        const {name} = qs.parse(query);
        fs.readFile(`/configmap/${name}`, 'utf8', function (err,data) {
            if (err) {
              return console.log(err);
            }
            res.end(`<h1>${name}: ${data}</h1>`)
          });
    }

    let envs = "";
    let env = process.env;
    Object.keys(env).forEach(function(key) {
        envs += '\nexport ' + key + '="' + env[key] +'" \r\n ';
      });

    if (pathname === '/') {
        res.end(`<h1>Hello World 11 - ${envs}</h1>`);
    }
});

function handleError(code, res) {
    res.statusCode = code;
    res.end(`{"error": "${http.STATUS_CODES[code]}"}`);
}

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});