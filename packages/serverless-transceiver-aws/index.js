'use strict'

const AWS = require('aws-sdk')

// Could add concept of async invocations here through options i.e. InvocationType: Event
const invoke = (lambda, lambdaName, data) => {
    const params = {
        FunctionName: lambdaName,
        InvocationType: 'RequestResponse',
        Payload: JSON.stringify(event),
    };

    return lambda.invoke(params).promise().then((result) => {
        console.log('Received result: ', result);

        if(result.FunctionError) {
            return Promise.reject(new Error(`Error on ${lambdaName}`));
        }

        const data = JSON.parse(result.Payload);
        return data
    });
}


module.exports = (options) => {
    const lambda = new AWS.Lambda(options)

    return {
        invoke: (lambdaName, data) => invoke(lambda, lambdaName, data),
    }
}