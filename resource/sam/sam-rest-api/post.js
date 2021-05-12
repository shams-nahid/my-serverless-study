const AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-south-1' });

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME;

exports.handler = async event => {
  const userid = event.pathParameters.userid;
  const { firstName, lastName, email, website } = JSON.parse(event.body);
  const item = {
    userid,
    firstName,
    lastName,
    email,
    website
  };
  const data = await dynamodb.put({
    TableName: tableName,
    Item: item
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Data inserted successfully',
      data,
    })
  }
}

// const lambda = new AWS.Lambda({
//   endpoint: 'http://127.0.0.1:3001/'
// });

// const params = {
//   FunctionName: 'HelloWorldFunction',
//   Payload: new Buffer('{}')
// };

// lambda.invoke(params, (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data)
//   }
// });
