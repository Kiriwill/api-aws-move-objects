
// Modulos externos
const express = require('express');
const router = express.Router();
// Serviços
const AwsMoveFilesAsync = require('./moveS3');
const config = require('./config')

router.get('/api/cnt-backup-fotos-corretor/', async (req,res) => {
    try {
        // Configurações
        const cf = await config();

        // Instancia AWS
        const awsMvFiles = await new AwsMoveFilesAsync(cf);
    
        // Midias-originais
        const photoKeys = await awsMvFiles.listObjsFromBucketAsync()

        // Backup p/ arquivadas
        awsMvFiles.copyPasteObjsAsync(photoKeys, cf.destinyFolder)

        // Deleta tudo da pasta midias-originais
        awsMvFiles.deleteFilesAsync(photoKeys)

        res.status(200).send({'Enviado': true})
    }
    catch (error){
        res.status(500).send({
            'Enviado': false,
            'Error': error
        })
    }

})

module.exports = router;
