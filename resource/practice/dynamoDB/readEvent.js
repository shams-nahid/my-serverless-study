const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
AWS.config.update({ region: 'ap-south-1' });

const documentClient = new AWS.DynamoDB.DocumentClient();

const id = '13624625-99c4-468f-a0d9-53052e9f0928';

documentClient.query({
    TableName: 'Test_TourAssistant_Event',
    IndexName: 'eDate-index',
    KeyConditionExpression: "eDate > :start",
    ExpressionAttributeValues: {
        ':start': 5,
        // ':end': 8
    }
}, (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(JSON.stringify(data, null, 2));
});