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
    GPIO.setup(7, gpio.DIR_IN, readInput);
 
    function readInput() {
        GPIO.read(17, function(err, value) {
            console.log('The value is ' + value);
        });
    }
    // const gpio = 17
    // GPIO.setup(gpio, GPIO.DIR_OUT, ()=>{
    //     gpio_set(gpio,'LOW',()=>{
    //         setTimeout(() => {
    //             gpio_set(gpio,'HIGH',()=>{
    //                 setTimeout(() => {
    //                     gpio_set(gpio,'LOW',()=>{
    //                         callback(true)
    //                     })
    //                 },400)
    //             })
    //         },400)
    //     })
    // })
    
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