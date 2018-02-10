'use strict'

var GPIO = require('rpi-gpio');
 
const gpio_set = (gpio,value,callback) => {
    GPIO.write(17, true, function(err) {
        if (err) throw err;
        console.log(gpio+'='+value)
        callback()
    });    
}

module.exports.trigger = (thing, callback) => {
    const gpio = 17
    GPIO.setup(gpio, gpio.DIR_OUT, ()=>{
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
    })
    
}

module.exports.on = (thing, callback) => {
    const gpio = 17
    GPIO.setup(gpio, gpio.DIR_OUT, ()=>{
        gpio_set(gpio,'HIGH',()=>{
            callback(true)
        })
    })
}

module.exports.off = (thing, callback) => {
    const gpio = 17
    GPIO.setup(gpio, gpio.DIR_OUT, ()=>{
        gpio_set(gpio,'LOW',()=>{
            callback(true)
        })
    })
}