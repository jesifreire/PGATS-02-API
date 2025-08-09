const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const userController = require('./controllers/userController');
const transferController = require('./controllers/transferController');

const app = express();
app.use(express.json());

// Swagger config
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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas de usuário
app.post('/register', userController.register);
app.post('/login', userController.login);
app.get('/users', userController.listUsers);
app.post('/users/favorecido', userController.addFavorecido);

// Rotas de transferência
app.post('/transfer', transferController.transfer);
app.get('/transfers', transferController.getTransfers);

module.exports = app;
