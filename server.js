const express = require('express')
var path    = require("path");
var request = require('request');
var url = require('url');
var http = require('http');
const app = module.exports.app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);


var hosts = require("./hosts.json").hosts
var volume = 30;
const DEBUG = true;

function updateVolume(host, volume) {
    console.log("[" + host + "] : " + volume)
    if(DEBUG){return};
    var url = 'http://' + host + '/api/setData?path=BeoSound:/setVolume&roles=activate&value={"type":"beoSoundVolumeData","beoSoundVolumeData":{"volume":' + volume + ',"volumeSource":"website"}}';
    request.get(url,function(err,res,body){
        if(err) {
            return console.log("Error while loading: " + url);
        }
    });
}

app.set('view engine', 'html');
app.use(express.static('node_modules'))
app.use(express.static('public'))


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});


server.listen(9001, function() {
    console.log("-- Starting webserver..")
    console.log('-- Server running on port 9001')
    updateVolume(hosts[0], volume);
});


io.sockets.on('connection', function(socket) {
    socket.emit("volumeUpdate", volume)
    socket.on('reqUpdateVolume', function(data) {
        socket.broadcast.emit('volumeUpdate', data)
        console.log("[SERVER] VolumeRequest: " + data )
    })
    console.log("[SERVER] NewClient ("+socket.handshake.address+")")
})
