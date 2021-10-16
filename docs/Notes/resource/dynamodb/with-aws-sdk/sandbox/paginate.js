const AWS = require('aws-sdk');
const async = require('async');
const _ = require('lodash');
AWS.config.update({ region: 'ap-south-1' });

const documentClient = new AWS.DynamoDB.DocumentClient();

let startKey = [];
let results = [];
let pages = 0;
async.doWhilst(
    callback => {
        const params = {
            TableName: 'td_notes_sdk',
            Limit: 3
        }
        if (!_.isEmpty(startKey)) {
            params.ExclusiveStartKey = startKey;
        }
        documentClient.scan(params, (err, data) => {
            if (err) {
                console.log(err);
                return callback(err, {})
            }
            if (typeof data.LastEvaluatedKey !== 'undefined') {
                startKey = data.LastEvaluatedKey;
            } else {
                startKey = [];
            }
            if (!_.isEmpty(data.Items)) {
                results = _.union(results, data.Items);
            }
            console.log(JSON.stringify(data, null, 2))
            pages++;
            callback(null, results);
        });
    },
    // truth test
    async () => {
        if (_.isEmpty(startKey)) {
            return false;
        } else {
            return true;
        }
    },
    // callback method
    (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(JSON.stringify(data, null, 2));
        console.log("Item Count: ", data.length);
        console.log('Pages: ', pages);
    }
);

