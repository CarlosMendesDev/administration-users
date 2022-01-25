const AWS = require('aws-sdk');

AWS.config.correctClockSkew = true;

AWS.config.update({
  region: process.env.REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: process.env.API_VERSION });

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

module.exports = { getUserById }
