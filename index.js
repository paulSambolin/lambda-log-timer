'use strict';

const AWS = require('aws-sdk');

class Timer {
    constructor() {
        // this.context = context;
        // this.lambda = new AWS.Lambda();
        // this.cloudwatch = new AWS.CloudWatch();
        // this.cloudwatchlogs = new AWS.CloudWatchLogs();
    }

    // callback passed in is AWS callback
    static getTime(main, event, context, callback) {
        var startTime = Date.now();
        main(event, context, (err, data) => {
            // when main callback is called, call the AWS callback
            var endTime = Date.now();
            var duration = endTime - startTime;

            // log the output
            var output = {
                request: event,
                response: data,
                functionName: context.functionName,
                requestId: context.awsRequestId,
                version: context.functionVersion,
                startTime: startTime,
                endTime: endTime,
                duration: duration
            }
            console.log(output);
            callback(err, data);
        });
    }
}

module.exports = Timer;
