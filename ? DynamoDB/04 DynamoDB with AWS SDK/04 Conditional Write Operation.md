### Conditional Write Operation
---

Before we write, we will check, if the items timestamp exists in the table. If not exists, only then we will proceed the write operation.

```js
const AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-south-1' });

const documentClient = new AWS.DynamoDB.DocumentClient();

documentClient.put({
    TableName: 'td_notes_sdk',
    Item: {
        user_id: 'ABC',
        timestamp: 1,
        title: 'Initial Title',
        content: 'Initial Content'
    },
    ConditionExpression: '#t <> :t',
    ExpressionAttributeNames: {
        '#t': 'timestamp'
    },
    ExpressionAttributeValues: {
        ':t': 1
    }
}, (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(JSON.stringify(data, null, 2));
});
```

If we again try to put the item in the table, we will get an error, because, the timestamp `1` now exist.

Even if we do not write a item in the table with conditional write, dynamoDB still count this in WCU.