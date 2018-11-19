const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
module.exports.run = async (event) => {
  const data = JSON.parse(event.body);
  const expression = Object.entries({todo:data.todo, checked: data.checked})
  .map(([key,val])=>
  val !== undefined ? `${key}=:${key}` : '')
  .filter(n=>n).join(', ');
  const params = {
    TableName: 'todos',
    Key: { 
      id: event.pathParameters.id
     },
    UpdateExpression: `set ${expression}`,
    ExpressionAttributeValues:{
        ":todo": data.todo,
        ":checked": data.checked
    },
    ReturnValues:"ALL_NEW"
  };
  const result = await dynamoDb.update(params).promise();
  return  {
      statusCode:200,
      body: JSON.stringify(result.Attributes)
    };
};
