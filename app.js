var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(8080);

function handler(req, res) {
    fs.readFile(__dirname + '/public/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}

var fetchIO = io.on('connection', function (socket) {
    socket.on('sendToServer', function(msg){
        console.log(msg);
        fetchIO.emit('receiveFromClient', { msg: msg });
    });
});
