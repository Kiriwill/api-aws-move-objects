const AWS = require('aws-sdk');
const ssm = new AWS.SSM( { region: 'REGIAO_AQUI' } );

async function getParamsAsync(Parameter) {
    var params = {
        Name: Parameter
    }

    const valor = await ssm.getParameter(params).promise();

    return valor.Parameter.Value;
}

module.exports = getParamsAsync;
