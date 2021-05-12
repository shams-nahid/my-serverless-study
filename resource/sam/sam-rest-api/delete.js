const AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-south-1' });

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME;

exports.handler = async event => {
  const userid = event.pathParameters.userid;
  const data = await dynamodb.delete({
    TableName: tableName,
    Key: {
      userid
    }
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'User Deleted'
    })
  }
}