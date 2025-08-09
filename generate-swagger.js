const fs = require('fs');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Transferências',
      version: '1.0.0',
      description: 'API para testes e automação de transferências',
    },
  },
  apis: ['./controllers/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

fs.writeFileSync('swagger.json', JSON.stringify(swaggerSpec, null, 2));
console.log('swagger.json gerado com sucesso!');
