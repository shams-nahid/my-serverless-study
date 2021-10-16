const AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-south-1' });

const { getResponseHeaders, getUserId } = require('./util');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.NOTES_TABLE;

exports.handler = async event => {
  const timestamp = decodeURIComponent(event.pathParameters.timestamp);
  const params = {
    TableName: tableName,
    Key: {
      user_id: getUserId(event.headers),
      timestamp: parseInt(timestamp)
    }
  };


  await dynamodb.delete(params).promise();

  try {
    return {
      statusCode: 200,
      headers: getResponseHeaders(),
    };
  } catch (err) {
    console.log('Error', err);
    return {
      statusCode: err.statusCode ? err.statusCode : 500,
      headers: getResponseHeaders(),
      body: JSON.stringify({
        error: err.name ? err.name : 'Exception',
        message: err.message ? err.message : 'Unknown error'
      })
    }
  }
}