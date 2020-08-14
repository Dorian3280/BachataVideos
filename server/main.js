const http = require('http');
const fs = require('fs');
const url = require('url');

let server = http.createServer();
server.on('request', (request, response) => {
    const level = url.parse(request.url, true).query.level;
    fs.readdir(`C:/Users/billo/Desktop/Meteor/Bachata/public/videos/${level}`, (err, files) => {
      if (err) {
        return console.log('Unable to scan directory: ' + err);
      }
      response.writeHead(200, {
        'Content-Type': 'text/plain',
        'CORS': 'cors',
        'Access-Control-Allow-Origin': '*'
      });
      response.end(JSON.stringify(files));
  });
})

server.listen(8080);