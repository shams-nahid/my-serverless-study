### Atomic Counters
---

Atomic counter

- Increment or decrement values independently
- All the request will be ordered as they were received
- New operation takes place only when the previous one is completed

Atomic counter can be used to store number of visitors of a site. It is not suitable for high degree of accuracy application, like banking application.

```js
const AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-south-1' });

const documentClient = new AWS.DynamoDB.DocumentClient();

documentClient.update({
    TableName: 'td_notes_sdk',
    Key: {
        user_id: 'ABC',
        timestamp: 1
    },
    UpdateExpression: 'set #v = #v + :incr',
    ExpressionAttributeNames: {
        '#v': 'views'
    },
    ExpressionAttributeValues: {
        ':incr': 1
    }
}, (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(JSON.stringify(data, null, 2));
});

```
