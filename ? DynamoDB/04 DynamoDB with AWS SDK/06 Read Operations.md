### Read Operations

---

**Get By Primary Key**

```js
const AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-south-1' });

const documentClient = new AWS.DynamoDB.DocumentClient();

documentClient.get({
    TableName: 'td_notes_sdk',
    Key: {
        user_id: 'A',
        timestamp: 1,
    }
}, (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(JSON.stringify(data, null, 2));
});
```

**Query Operation**

Query where `user_id` is `A`.

```js
const AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-south-1' });

const documentClient = new AWS.DynamoDB.DocumentClient();

documentClient.query({
    TableName: 'td_notes_sdk',
    KeyConditionExpression: "user_id = :uid",
    ExpressionAttributeValues: {
        ':uid': 'A'
    }
}, (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(JSON.stringify(data, null, 2));
});
```

**Scan Operation**

```js
const AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-south-1' });

const documentClient = new AWS.DynamoDB.DocumentClient();

documentClient.scan({
    TableName: 'td_notes_sdk',
}, (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(JSON.stringify(data, null, 2));
});
```

**Filter Operation**

```js
const AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-south-1' });

const documentClient = new AWS.DynamoDB.DocumentClient();

documentClient.scan({
    TableName: 'td_notes_sdk',
    FilterExpression: "cat = :cat",
    ExpressionAttributeValues: {
        ":cat": 'general'
    }
}, (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(JSON.stringify(data, null, 2));
});
```

**Batch Get**

Getting items from two tables using batch get

```js
const AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-south-1' });

const documentClient = new AWS.DynamoDB.DocumentClient();

var params = {
    RequestItems: {
      'td_notes_test': {
        Keys: [
          {
             user_id: 'A',
             timestamp: 1
          },
          {
            user_id: 'B',
            timestamp: 2
         }
        ]
      },
      'td_notes_sdk': {
        Keys: [
            {
                user_id: 'A',
                timestamp: 10
            }
        ]
      }
    }
  };

  documentClient.batchGet(params, function(err, data) {
    if (err) console.log(err);
    else console.log(JSON.stringify(data, null, 2));
  });
```

