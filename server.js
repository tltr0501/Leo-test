//
// Sample http server using node.js
//   It works for "readMe.html, simple.html, simple.css, simple.js, umemura.jpg, and
//   video : './20180310-rehearsal.mp4.
//
//
const http = require('http'); 
const fs = require('fs'); 
const url = require('url');

const htmlData = fs.readFileSync('./main.html', 'UTF-8');
//const cssData =  fs.readFileSync('./simple.css', 'UTF-8');
//const jsData =  fs.readFileSync('./simple.js', 'UTF-8');
//const figData = fs.readFileSync('./pic');
//const videoPath = './20180310-rehearsal.mp4';

// Note that this service responds 'ReadMe.html' (not 'index.html') for  '/'.
function serviceClient(request, response) {
    const urlInformation = url.parse(request.url);
    
    switch(urlInformation.pathname) {
    case '/':
	fs.readFile('./ReadMe.html', 'UTF-8',
		function(error, data) {
		    response.writeHead(200, {'Content-Type' : 'text/html'});
		    response.write(data);
		    response.end(); } );
	break;
    case '/main.html':
	response.writeHead(200, {'Content-Type' : 'text/html'});
	response.write(htmlData);
	response.end(); 
	break;

    default:
	response.writeHead(404, {'Content-Type' : 'text/plain'});
	response.write(urlInformation.pathname);
	response.end();
    }
}
		
const server = http.createServer(serviceClient);
const serverPort = process.env.PORT || 3000; // For Heroku
server.listen(serverPort);
console.log('server.listen at ' + serverPort);
