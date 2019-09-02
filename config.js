/*
    Configurações para a API de mover arquivos no S3
*/

const ssm = require('./getParams');

// Ambiente
const env = process.env.AMBIENTE || "Ambiente não fornecido."

// Parametros
var ParamBucket = `PARAMETRO/PARA/BUCKET`;
var DestinyParameter = `PARAMETRO/PARA/DESTINO`;
var OriginParameter = `PARAMETRO/PARA/ORIGEM`;
var StorageParameter = `PARAMETRO/ARMAZENAMENTO`;

module.exports = async () => {
    return {
        bucket: await ssm.getParameterValueAsync(ParamBucket),  // Bucket
        originFolder: await ssm.getParameterValueAsync(OriginParameter),  // Pasta da origem
        destinyFolder: await ssm.getParameterValueAsync(DestinyParameter),    // Pasta destino
        storageFolder: await ssm.getParameterValueAsync(StorageParameter),   // Pasta de armazenamento
        default: { 
            apiVersion: '2006-03-01',
            signatureVersion: 'v4',
            region: 'REGIAO_AQUI'
        }
    }
}
