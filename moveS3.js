const AWS = require('aws-sdk');

module.exports = class AwsMoveFilesAsync{
    constructor(configs){
        this.S3 = new AWS.S3(configs.default); // Instancia aws-sdk
        this.Bucket = configs.bucket;
        this.Origin = configs.originFolder;
    }   

    async listObjsFromBucketAsync(){
        const params = {
            Bucket: this.Bucket,
            Prefix: this.Origin
        }

        const response = await this.S3.listObjects(params).promise();
        return response.Contents;
    }

    async copyPasteObjAsync(copysource, bucket, key, config = {}){
        const defaultParams = {
            CopySource: encodeURIComponent(copysource),
            Bucket: bucket,
            Key: key
        }
        
        const params = Object.assign({}, defaultParams, config) 
        
        return await this.S3.copyObject(params, (err, data) => {
            if (err) console.debug(err, err.stack); // ocorreu um erro
            else     console.debug({
                'Bucket': bucket,        // successo
                'key': key,
                'data': data
            });          ;
        });
    }

    async copyPasteObjsAsync(keys, destiny){
        keys.forEach(async (val, i) => {
            const key = val.Key;
            if (key.split('/').length >= 3) {
                const cs = `/${this.Bucket}/${key}`;
                const destKey = `${destiny}/${key}`
            
                this.copyPasteObjAsync(cs, this.Bucket, destKey);
            }
       })
    }

    async deleteFilesAsync(deleteObjsList, b = this.Bucket){
        params = {
            Bucket: b,
            Delete: d
        }
        
        await this.S3.deleteObjects(params, (err, data) => {
            if (err) console.debug(err, err.stack); // ocorreu um erro
            else     console.debug(data);           // successo;
        });
    }

}
