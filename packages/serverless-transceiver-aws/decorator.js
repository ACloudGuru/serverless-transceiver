'use strict'

const node43 = (handler, schema) => {
    return (event, context, cb) => {
        // validate event against schema

        handler(event, context, cb)
    }
}

module.exports = {
    node43,
}