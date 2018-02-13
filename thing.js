'use strict'

var GPIO = require('gpio');

module.exports.parseThings = (things) => {
    var thingsDict = {}
    things.forEach((thing) => {
        thingsDict[thing.name] = thing
    })
    return thingsDict
}

module.exports.trigger = (thing, callback) => {
    const gpio_number = thing.port_number
    gpio_set(gpio_number,0,()=>{
        setTimeout(() => {
            gpio_set(gpio_number,1,()=>{
                setTimeout(() => {
                    gpio_set(gpio_number,0,()=>{
                        callback(true)
                    })
                },600)
            })
        },600)
    })
}

module.exports.on = (thing, callback) => {
    const gpio_number = thing.port_number
    gpio_set(gpio_number,1,()=>{
        callback(true)
    })
}

module.exports.off = (thing, callback) => {
    const gpio_number = thing.port_number
    gpio_set(gpio_number,0,()=>{
        callback(true)
    })
}

const gpio_set = (gpio_number,value,callback) => {
    if (typeof GPIO.exists !== 'undefined') {
        var gpio = GPIO.export(gpio_number, {
           direction: "out",
           ready: function() {
               gpio.set(value, function() {
                   callback()
               });
           }
        });   
    }else{ //dev
        console.log(gpio_number, value);
        callback()
    }
}