const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');


const fileExist = function(path) {
  try {
    fs.accessSync(path);
    return true;
  } catch (err) {
    return false;
  }
};


http
    .createServer((req, res) => {

        const file = decodeURIComponent(url.parse(req.url).pathname)

        const filePath = path.join(__dirname, file)
        
        if ( fileExist(filePath) )
            fs.createReadStream(filePath).pipe(res, { end: true })
        else {
            console.log( file, filePath )
            res.writeHead(404)
            res.end()
        }
    })
    .listen(8082);