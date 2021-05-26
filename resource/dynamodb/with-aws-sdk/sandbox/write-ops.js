const AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-south-1' });

const documentClient = new AWS.DynamoDB.DocumentClient();

documentClient.batchWrite({
    RequestItems: {
        'td_notes_sdk': [
            {
                DeleteRequest: {
                    Key: {
                        user_id: 'bb',
                        timestamp: 1
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        user_id: '11',
                        timestamp: 1,
                        title: 'Title 11',
                        content: 'Content 11'
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        user_id: '22',
                        timestamp: 2,
                        title: 'Title 22',
                        content: 'Content 22'
                    }
                }
            }
        ]
    }
}, (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(JSON.stringify(data, null, 2));
});
