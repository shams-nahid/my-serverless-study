### Table Operation

---

**Create Table**

create a file `table-ops.js`,

```js
const AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-south-1' });

const ddb = new AWS.DynamoDB();

ddb.listTables({Limit: 10}, function(err, data) {
    if (err) {
      console.log("Error", err.code);
    } else {
      console.log("Table names are ", data.TableNames);
    }
  });
```

If we run this script, `node table-ops.js`, we should see the list of the tables.

[Doc](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/dynamodb-examples-using-tables.html) for listing tables.

**Get Table Details**

To get detail of a table we should pass the table name as params.

```js
const AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-south-1' });

const ddb = new AWS.DynamoDB();

ddb.describeTable({
  TableName: 'td_notes_test'
}, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", JSON.stringify(data, null, 2));
  }
});
```

If we run the script, we should see the table details.

[doc](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/dynamodb-examples-using-tables.html) for getting details of the table.

**Create Table**

To create a table, we have to pass all the tables definition as params.

```js
const AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-south-1' });

const params = {
    AttributeDefinitions: [
      {
        AttributeName: 'user_id',
        AttributeType: 'S'
      },
      {
        AttributeName: 'timestamp',
        AttributeType: 'N'
      }
    ],
    KeySchema: [
      {
        AttributeName: 'user_id',
        KeyType: 'HASH'
      },
      {
        AttributeName: 'timestamp',
        KeyType: 'RANGE'
      }
    ],
    TableName: 'td_notes_sdk',
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    },
  };

  // Call DynamoDB to create the table
  ddb.createTable(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Table Created", data);
    }
  });
```

If we run the script, we should see a table is being being created.

[doc](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/dynamodb-examples-using-tables.html) for creating a table.

**Update Table**

To update table, we have to pass the updated information as params,

```js
const AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-south-1' });

const ddb = new AWS.DynamoDB();

ddb.updateTable({
    TableName: 'td_notes_sdk',
    ProvisionedThroughput: {
        ReadCapacityUnits: 2,
        WriteCapacityUnits: 1
     },
  }, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", JSON.stringify(data, null, 2));
    }
  });
```

As output, we should see the updating status.


[doc](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#updateTable-property) for update dynamoDB table.

**Delete Table**

To delete a table, we can simply call delete method with table name as parameter,

```js
const AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-south-1' });

const ddb = new AWS.DynamoDB();

ddb.deleteTable({
    TableName: 'td_notes_sdk',
  }, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", JSON.stringify(data, null, 2));
    }
  });
```

As output we should see, the table is being deleted.