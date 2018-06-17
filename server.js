const express = require('express')
var path    = require("path");
var request = require('request');
var url = require('url');
var http = require('http');
const app = module.exports.app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);


var devices = require("./hosts.json").devices
var volume = 30;
const DEBUG = true;

function updateDevices(data) {
    devices = data;
    for (var i in devices) {
        updateVolume(devices[i])
    }
}

function updateVolume(device) {
    console.log("[" + device.ip + "] : " + device.volume)
    if(DEBUG){return};
    var url = 'http://' + device.ip + '/api/setData?path=BeoSound:/setVolume&roles=activate&value={"type":"beoSoundVolumeData","beoSoundVolumeData":{"volume":' + device.volume + ',"volumeSource":"website"}}';
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

app.get('/devices', function (req, res) {
    res.json(devices);
});

server.listen(80, function() {
    console.log("-- Starting webserver..")
    console.log('-- Server running..')
    updateVolume(devices[0], volume);
});


io.sockets.on('connection', function(socket) {
    socket.emit("devices", devices)
    socket.on("update", function(data) {
        updateDevices(data)
        socket.broadcast.emit('devices', data)
        console.log("[SERVER] device update received")
    })
    console.log("[SERVER] NewClient ("+socket.handshake.address+")")
})
