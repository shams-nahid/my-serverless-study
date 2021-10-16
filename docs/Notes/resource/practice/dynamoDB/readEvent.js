const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
AWS.config.update({ region: 'ap-south-1' });

const documentClient = new AWS.DynamoDB.DocumentClient();

documentClient.query({
    TableName: 'Test_TourAssistant_Event',
    IndexName: 'year-eventDate-index',
    KeyConditionExpression: "#yr = :year and eventDate BETWEEN :start AND :end",
    ExpressionAttributeValues: {
        ':year': 2017,
        ':start': '10',
        ':end': '20',
    },
    ExpressionAttributeNames:{
        "#yr": "year"
    },
}, (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(JSON.stringify(data, null, 2));
});