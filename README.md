# Readme 

> API para mover arquivos no S3 a partir de parametros no SSM. 

### Funcionamento

A aplicação se divide em etapas:

1) Requisita parametros do SSM;
2) Obtém objetos do S3 no folder inicial;
3) Executa backup em folder de arquivamento;
4) Deleta objetos no folder inicial;

### Organização das pastas

/config.js: parametros gerais de configuração do SSM;
/getParams.js: função para obter parametros do SSM;
/index.js: main da aplicação;
/moveS3.js: classe com métodos AWS gerais.



