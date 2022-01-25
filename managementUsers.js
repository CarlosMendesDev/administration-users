const AWS = require('aws-sdk');
const UUID = require('uuid');

AWS.config.correctClockSkew = true;

AWS.config.update({
  region: process.env.REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: process.env.API_VERSION });

async function createUser(event) {
  const requestBody = JSON.parse(event.body);

  const { user_name, user_login, user_password } = requestBody;

  const params = {
    TableName: 'users',
    Item: {
      'user_id': UUID.v4(),
      'user_name': user_name,
      'user_login': user_login,
      'user_password': user_password,
    },
  };

  try {
    await docClient.put(params).promise();

    return {
      statusCode: 201,
      body: JSON.stringify(
        {
          message: 'Usuário cadastrado com sucesso.',
        },
        null,
        2
      ),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode,
      body: JSON.stringify(error),
    };
  };
};

async function getUserById(event) {
  const { user_id } = event.pathParameters;

  const params = {
    TableName: 'users',
    Key: { user_id },
  };

  try {
    const data = await docClient.get(params).promise();

    const { user_id, user_name } = data.Item; 

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          user_id,
          user_name,
        },
        null,
        2
      ),
    };
  } catch (error) {
    return {
      statusCode: 200,
      body: JSON.stringify(error),
    };
  };
};

module.exports = { getUserById, createUser }
