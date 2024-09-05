const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Harry Potter API',
            version: '1.0.0',
            description: 'Documentação da API para o projeto Harry Potter.',
        },
        servers: [
            {
                url: 'http://localhost:5001/api',
                description: 'Servidor de Desenvolvimento',
            },
        ],
    },
    apis: [path.join(__dirname, '../routes/*.js')], // Caminho para seus arquivos de rota
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
