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