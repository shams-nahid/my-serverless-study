const getUserId = headers => headers.app_user_id;

const getUserName = headers => headers.app_user_name;

const getResponseHeaders = () => ({
  "Access-Control-Allow-Origin": "*"
});

module.exports = {
  getResponseHeaders,
  getUserId,
  getUserName
}
