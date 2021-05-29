const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
AWS.config.update({ region: 'ap-south-1' });

const documentClient = new AWS.DynamoDB.DocumentClient();

const id = uuidv4();
const eventDate = moment().unix();
// const eventDate = 10;
documentClient.put({
    TableName: 'Test_TourAssistant_Event',
    Item: {
        id,
        eventDate,
        eDate: 7
    },
    ConditionExpression: 'id <> :id',
    // ExpressionAttributeNames: {
    //     '#t': 'id'
    // },
    ExpressionAttributeValues: {
        ':id': id
    }
}, (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(JSON.stringify(data, null, 2));
});