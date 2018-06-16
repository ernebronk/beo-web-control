const express = require('express')
var path    = require("path");
var request = require('request');
var url = require('url');
const app = express()


var hosts = require("./hosts.json").hosts
var volume = 67;

function updateVolume(host, volume) {
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

app.get('/setVolume', function(req, res) {
    var url_parts = url.parse(req.url, true);
    volume = url_parts.query.volume;
    updateVolume(hosts[0], volume);
    return res.send(volume.toString());
})

app.get('/getVolume', function(req, res) {
    return res.send(volume.toString());
})

app.listen(9001, function() {
    console.log("-- Starting webserver..")
    console.log('-- Server running on port 9001')
    updateVolume(hosts[0], volume);
});
