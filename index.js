'use strict';

const AWS = require('aws-sdk');

class Timer {
    constructor() { }

    // Controllers add process and transaction id's
    static getTimeCorrelation(main, event, context, processId, transactionId, callback) {
        var startTime = Date.now();
        main(event, context, processId, transactionId, (err, data) => {
            // when main callback is called, call the AWS callback
            var endTime = Date.now();
            var duration = endTime - startTime;

            var output = {
                request: event,
                response: data,
                processId: processId,
                transactionId: transactionId,
                functionName: context.functionName,
                requestId: context.awsRequestId,
                version: context.functionVersion,
                startTime: startTime,
                endTime: endTime,
                duration: duration
            }
            console.log(JSON.stringify(output));
            callback(err, data);
        });
    }

    // Services read the process and transaction id's from the event object
    static getTimeService(main, event, context, callback) {
        var startTime = Date.now();
        main(event, context, (err, data) => {
            // when main callback is called, call the AWS callback
            var endTime = Date.now();
            var duration = endTime - startTime;

            var output = {
                request: event,
                response: data,
                processId: event.ProcessId,
                transactionId: event.TransactionId,
                functionName: context.functionName,
                requestId: context.awsRequestId,
                version: context.functionVersion,
                startTime: startTime,
                endTime: endTime,
                duration: duration
            }
            console.log(JSON.stringify(output));
            callback(err, data);
        });
    }
}

module.exports = Timer;
