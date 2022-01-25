'use strict';
const countapi = require('countapi-js');

module.exports.getAcessNumber = async (event) => {
  const namespace = 'ton.com.br';

  const data = await countapi.get(namespace, 'visits');

  if(data.status === 200) {
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: `Número de acessos em ${namespace}`,
          ...data,
        },
        null,
        2
      ),
    };
  } else {
    return {
      statusCode: data.status,
      body: JSON.stringify(
        {
          message: `Error ${data.status}`,
        },
        null,
        2
      ),
    };
  }
};

module.exports.incrementAcessNumber = async (event) => {
  const namespace = 'ton.com.br';

  const data = await countapi.hit(namespace, 'visits');

  if(data.status === 200) {
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: `Número de acessos em ${namespace}`,
          ...data,
        },
        null,
        2
      ),
    };
  } else {
    return {
      statusCode: data.status,
      body: JSON.stringify(
        {
          message: `Error ${data.status}`,
        },
        null,
        2
      ),
    };
  }
};
