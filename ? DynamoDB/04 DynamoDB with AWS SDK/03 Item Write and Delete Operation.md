### Item Write and Delete Operation
---

AWS `DocumentClient` is a wrapper class of the `DynamoDB` class. This wrapper helps to write code without being define the types of attributes. Advantages of `DocumentClient` class,

- simplify using the dynamoDB by avoiding unnecessary details
- interpret dynamoDB native types to javascript types

[Doc](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html) for documentClient

Create a node app with named `write-ops.js`.

**Create an Item**

To write an item using javascript sdk, we can use,

```js
const AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-south-1' });

const documentClient = new AWS.DynamoDB.DocumentClient();

documentClient.put({
    TableName: 'td_notes_sdk',
    Item: {
        user_id: 'bb',
        timestamp: 1,
        title: 'my title',
        content: 'my content'
    }
}, (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(JSON.stringify(data, null, 2));
});
```

**Update Item With Put Method**

To update an existing item, we have to give the same primary key and updated property.

We can update the previous item we created, by keeping the primary key and different contents,


```js
const AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-south-1' });

const documentClient = new AWS.DynamoDB.DocumentClient();

documentClient.put({
    TableName: 'td_notes_sdk',
    Item: {
        user_id: 'bb',
        timestamp: 1,
        title: 'changed title',
        content: 'changed content'
    }
}, (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(JSON.stringify(data, null, 2));
});
```

**Update Item With Update Method**

If we use put method, we only provide the updated property values.

```js
const AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-south-1' });

const documentClient = new AWS.DynamoDB.DocumentClient();

documentClient.update({
    TableName: 'td_notes_sdk',
    Key: {
        user_id: 'bb',
        timestamp: 2
    },
    UpdateExpression: 'set #t = :t',
    ExpressionAttributeNames: {
        '#t': 'title'
    },
    ExpressionAttributeValues: {
        ':t': 'Updated Title'
    }
}, (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(JSON.stringify(data, null, 2));
});
```

**Delete an Item**

To delete an item we simply have to pass the key of the item,

```js
const AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-south-1' });

const documentClient = new AWS.DynamoDB.DocumentClient();

documentClient.delete({
    TableName: 'td_notes_sdk',
    Key: {
        user_id: 'bb',
        timestamp: 2
    },
}, (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(JSON.stringify(data, null, 2));
});
```

**Batch Write Items**

We can do both write and delete using the batch write operation,

```js
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
```