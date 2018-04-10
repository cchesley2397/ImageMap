

// Server parameters
const port = 8080;
const indexDir = './dist/';

// Node modules
const http = require('http');
const fs = require('fs');




console.log("Starting server on port " + port);

http.createServer(function(request, response) {

        console.log(fs.existsSync("./keep"));
        fs.readFile(indexDir + 'index.html', function (err, data) {
            if (err) {
                response.writeHead(404);
                response.write('Not Found');
            } else {
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.write(data);
            }
            response.end();
        });
}).listen(port);



