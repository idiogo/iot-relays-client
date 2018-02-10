'use strict'

const io = require('socket.io-client');
const slack = require('./slack')
const Thing = require('./thing')
const socket = io(process.env.SOCKET);

socket.on('connect', function(data) {
    socket.emit('register', process.env.SETUP)
})

socket.on('hardware-trigger', function(data) {
    Thing.trigger(data.thing, (success) => {
        socket.emit('callback-'+data.requestID, success)
    })
})

socket.on('hardware-on', function(data) {
    Thing.on(data.thing, (success) => {
        socket.emit('callback-'+data.requestID, success)
    })
})

socket.on('hardware-off', function(data) {
    Thing.off(data.thing, (success) => {
        socket.emit('callback-'+data.requestID, success)
    })
})

//SETUP={\"name\":\"linden-gardens\",\"things\":[\"portaria-externa\",\"portaria-interna\",\"garagem-terrereo\"]} nodemon app.js 

