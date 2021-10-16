const AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-south-1' });

const ddb = new AWS.DynamoDB();

// Get list of tables
// ddb.listTables({Limit: 10}, function(err, data) {
//     if (err) {
//       console.log("Error", err.code);
//     } else {
//       console.log("Table names are ", data.TableNames);
//     }
//   });

// Get details of a table
// ddb.describeTable({
//     TableName: 'td_notes_test'
//   }, function(err, data) {
//     if (err) {
//       console.log("Error", err);
//     } else {
//       console.log("Success", JSON.stringify(data, null, 2));
//     }
//   });

// Create a table
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

// update table
// ddb.updateTable({
//     TableName: 'td_notes_sdk',
//     ProvisionedThroughput: {
//         ReadCapacityUnits: 2,
//         WriteCapacityUnits: 1
//      },
//   }, function(err, data) {
//     if (err) {
//       console.log("Error", err);
//     } else {
//       console.log("Success", JSON.stringify(data, null, 2));
//     }
//   });


// delete table
// ddb.deleteTable({
//     TableName: 'td_notes_sdk',
//   }, function(err, data) {
//     if (err) {
//       console.log("Error", err);
//     } else {
//       console.log("Success", JSON.stringify(data, null, 2));
//     }
//   });

