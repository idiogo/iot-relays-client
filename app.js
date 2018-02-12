'use strict'

const io = require('socket.io-client');
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

//SETUP={\"name\":\"linden-gardens\",\"things\":[{\"name\":\"portaria-externa\",\"port_numer\":\"19\"},{\"name\":\"portaria-interna\",\"port_numer\":\"17\"},{\"name\":\"garagem-terreo\",\"port_numer\":\"18\"},{\"name\":\"garagem-subsolo\",\"port_numer\":\"20\"}]} nodemon app.js 

