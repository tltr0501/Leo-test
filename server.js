//
// Sample http server using node.js
//   It works for "readMe.html, simple.html, simple.css, simple.js, umemura.jpg, and
//   video : './20180310-rehearsal.mp4.
//
//
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

// サーバーの起動ポート
const serverPort = process.env.PORT || 3000;

// フォルダ内の画像ファイル一覧を取得する関数
function getImagesList(folderPath) {
    return fs.readdirSync(folderPath)
        .filter(file => file.endsWith('.png') || file.endsWith('.jpg'));
}

// メインページのデータを読み込む
const mainData = fs.readFileSync('./main_2.html', 'UTF-8');

// じゃんけんページのデータを読み込む
const jankenData = fs.readFileSync('./janken.html', 'UTF-8');

// チャットページのデータを読み込む
const chatData = fs.readFileSync('./text.html', 'UTF-8');

// 画像データの読み込み
const Dog1Data = fs.readFileSync('./Dog1.jpg');
const Dog2Data = fs.readFileSync('./Dog2.jpg');
const Dog3Data = fs.readFileSync('./Dog3.jpg');

const JankenGuData = fs.readFileSync('./gu.png');
const JankenChokiData = fs.readFileSync('./choki.png');
const JankenParData = fs.readFileSync('./par.png');

const JankenData = fs.readFileSync('./janken_irasuto.jpg');

// サーバーの起動
const server = http.createServer((request, response) => {
    const urlInformation = url.parse(request.url);

    switch (urlInformation.pathname) {
        case '/':
            fs.readFile('./ReadMe.html', 'UTF-8', (error, data) => {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.write(data);
                response.end();
            });
            break;
        case '/main.html':
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(mainData);
            response.end();
            break;
        case '/janken.html':
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(jankenData);
            response.end();
            break;
        case '/text.html':
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(chatData);
            response.end();
            break;
            
        case '/Dog1.jpg':
	        response.writeHead(200, {'Content-Type' : 'image/jpeg', 'Content-Length' : Dog1Data.length,});
	        response.write(Dog1Data);
	        response.end(); 
	        break;
        case '/Dog2.jpg':
	        response.writeHead(200, {'Content-Type' : 'image/jpeg', 'Content-Length' : Dog2Data.length,});
	        response.write(Dog2Data);
	        response.end(); 
	        break;
        case '/Dog3.jpg':
	        response.writeHead(200, {'Content-Type' : 'image/jpeg', 'Content-Length' : Dog3Data.length,});
	        response.write(Dog3Data);
	        response.end(); 
	        break;
            
        case '/gu.png':
	        response.writeHead(200, {'Content-Type' : 'image/png', 'Content-Length' : JankenGuData.length,});
	        response.write(JankenGuData);
	        response.end(); 
	        break;
        case '/choki.png':
	        response.writeHead(200, {'Content-Type' : 'image/png', 'Content-Length' : JankenChokiData.length,});
	        response.write(JankenChokiData);
	        response.end(); 
	        break;
        case '/par.png':
	        response.writeHead(200, {'Content-Type' : 'image/png', 'Content-Length' : JankenParData.length,});
	        response.write(JankenParData);
	        response.end(); 
	        break;
            
        case '/janken_irasuto.jpg':
	        response.writeHead(200, {'Content-Type' : 'image/jpeg', 'Content-Length' : JankenData.length,});
	        response.write(JankenData);
	        response.end(); 
	        break;
            
        default:
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.write(urlInformation.pathname);
            response.end();
    }
});

server.listen(serverPort);
console.log('server.listen at ' + serverPort);
