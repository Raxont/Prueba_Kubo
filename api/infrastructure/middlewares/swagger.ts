// swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
const SERVER_URL = process.env.SERVER_URL;

// Definir las opciones para la documentación Swagger
const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0', // Especifica la versión de OpenAPI
    info: {
      title: 'API de Kubo', // Título de la documentación
      version: '1.0.0', // Versión de la API
      description: 'API de Prueba Tecnica',
      contact: {
        name: 'Camilo',
      },
    },
    servers: [
      {
        url: SERVER_URL,
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./api/routes/*.ts'], // Archivos donde están definidas las rutas
};

// Generar la documentación Swagger
const swaggerDocs = swaggerJSDoc(swaggerOptions);

export { swaggerUi, swaggerDocs };
