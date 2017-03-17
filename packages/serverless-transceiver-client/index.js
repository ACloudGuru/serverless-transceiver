'use strict'

const MESSAGE_VERSION = '1'

const invoke = (provider, func, data) => {
    const message = {
        version: MESSAGE_VERSION,
        data: data
    }

    return provider
        .invoke(func, data)
        .then((result) => {
            // check result type and handle appropriately

        }).catch((err) => {

        })
}

module.exports = (provider) => {
    return {
        invoke: (func, data) => invoke(provider, func, data)
    }
}