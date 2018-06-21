import {$,jQuery} from 'jquery';
window.$ = $;
window.jQuery = jQuery;
import 'bootstrap';
import io from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import Vue from 'vue'

var app = new Vue({
    el: "#app",
    data: {
        devices: [],
        volume: 0
    },
    methods: {
        update: function() {
            socket.emit('update', this.devices)
        }
    },
})

var socket = io.connect();
socket.on('devices', function(data) {
    app.devices = data;
});
