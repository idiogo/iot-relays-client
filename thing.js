'use strict'

var GPIO = require('gpio');
 
const gpio_set = (gpio_number,value,callback) => {
    var gpio = GPIO.export(gpio_number, {
       direction: "out",
       ready: function() {
           gpio.set(value, function() {
               console.log(gpio.value);
               callback()
           });
       }
    });   
}

module.exports.trigger = (thing, callback) => {
    const gpio_number = 17
    gpio_set(gpio_number,0,()=>{
        setTimeout(() => {
            gpio_set(gpio_number,1,()=>{
                setTimeout(() => {
                    gpio_set(gpio_number,0,()=>{
                        callback(true)
                    })
                },400)
            })
        },400)
    })
}

module.exports.on = (thing, callback) => {
    const gpio_number = 17
    gpio_set(gpio_number,1,()=>{
        callback(true)
    })
}

module.exports.off = (thing, callback) => {
    const gpio_number = 17
    gpio_set(gpio_number,0,()=>{
        callback(true)
    })
}