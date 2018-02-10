'use strict'

const gpio_set = (gpio,value) => {
    console.log(gpio+'='+value)
}

module.exports.trigger = (gpio, callback) => {
    gpio_set(gpio,'LOW')
    setTimeout(() => {
        gpio_set(gpio,'HIGH')
        setTimeout(() => {
            gpio_set(gpio,'LOW')
            callback(true)
        },400)
    },400)
}

module.exports.on = (gpio, callback) => {
    gpio_set(gpio,'HIGH')
    callback(true)
}

module.exports.off = (gpio, callback) => {
    gpio_set(gpio,'LOW')
    callback(true)
}