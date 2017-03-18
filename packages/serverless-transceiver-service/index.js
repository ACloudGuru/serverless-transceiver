'use strict'

const MESSAGE_VERSION = '1'

const createResult = (type, key, data) => ({
    version: MESSAGE_VERSION,
    result: {
        type,
        [key]: data,
    },
})

const success = (data) => createResult('success', 'data', data)
const validation = (messages) => createResult('validation', 'validation', { messages })

module.exports = {
    success,
    validation,
}