const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mi API Documentada',
      version: '1.0.0',
      description: 'Documentación de mi API creada con Node.js y Express',
    },
  },
  apis: ['./routes/*.js'], // Ruta a tus archivos con comentarios JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;