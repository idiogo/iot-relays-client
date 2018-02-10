'use strict'

var GPIO = require('gpio');
 
const gpio_set = (gpio,value,callback) => {
    var gpio17 = gpio.export(gpio, {
       direction: "out",
       ready: function() {
           gpio17.set(function() {
               console.log(gpio17.value);    // should log 1 
               callback()
           });
       }
    });   
}

module.exports.trigger = (thing, callback) => {
    const gpio = 17
    gpio_set(gpio,'LOW',()=>{
        setTimeout(() => {
            gpio_set(gpio,'HIGH',()=>{
                setTimeout(() => {
                    gpio_set(gpio,'LOW',()=>{
                        callback(true)
                    })
                },400)
            })
        },400)
    })
}

module.exports.on = (thing, callback) => {
    const gpio = 17
    GPIO.setup(gpio, GPIO.DIR_OUT, ()=>{
        gpio_set(gpio,'HIGH',()=>{
            callback(true)
        })
    })
}

module.exports.off = (thing, callback) => {
    const gpio = 17
    GPIO.setup(gpio, GPIO.DIR_OUT, ()=>{
        gpio_set(gpio,'LOW',()=>{
            callback(true)
        })
    })
}