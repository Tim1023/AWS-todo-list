const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.run = async (event) => {
  const params = {
    TableName: "todos",
    ProjectionExpression: "id, checked, todo",
    Limit: event.queryStringParameters && event.queryStringParameters.limit || 10
  };
 if(event.queryStringParameters && event.queryStringParameters.start){
   params.ExclusiveStartKey = {
     id: event.queryStringParameters.start
   }
 }
  const result = await dynamoDb.scan(params).promise();
  if (result) {
    return {
      statusCode:200,
      body: JSON.stringify(result)
    };
  }
}