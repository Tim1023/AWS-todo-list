const AWS = require('aws-sdk');
const uuid = require('uuid/v4');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
module.exports.run = async (event) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: 'todos',
    Item: {
      id: uuid(),
      todo: data.todo,
      checked: data.checked || false
    }
  };
  if(data.todo){
    await dynamoDb.put(params).promise();
      return {
        statusCode: 200,
        body: JSON.stringify(params.Item)
      };
  }else{
    return{
        statusCode: 500,
        body: JSON.stringify({ message: "Todo is required." })
      };
  }
  
};
