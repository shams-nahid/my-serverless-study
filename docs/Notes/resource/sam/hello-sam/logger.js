exports.handler = async event => {
  const eventJson = JSON.stringify(event);
  console.log(eventJson);
  return {
    statusCode: 200,
    body: eventJson
  }
}