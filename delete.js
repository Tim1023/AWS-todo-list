const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
module.exports.run = async (event) => {
  const params = {
    TableName: 'todos',
    Key: { 
      id: event.pathParameters.id
     },
  };
  await dynamoDb.delete(params).promise();
  return  {
      statusCode:200,
      body: JSON.stringify({ message: "Item has been deleted" })
    };
};
