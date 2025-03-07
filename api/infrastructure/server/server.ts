import express from "express"; // Importa Express para crear el servidor
import http from "http"; // Importa el módulo HTTP para crear un servidor
import UserRoutes from "../../routes/userRoutes"; // Rutas de los productos
import MovieRoutes from "../../routes/movieRoutes"; // Rutas de los productos
import { limiTotal } from "../middlewares/rateLimit"; // Middleware para limitar solicitudes

//* Función para crear y configurar el servidor Express
const createServer = () => {
  const app = express(); // Crea una nueva instancia de Express
  
  // Middlewares
  app.use(express.json()); // Middleware para analizar JSON en las solicitudes
  app.use(limiTotal); // Middleware para limitar el total de solicitudes
  app.use(express.urlencoded({ extended: true })); // Middleware para analizar datos URL-encoded
  
  // Rutas
  app.use('/api/users', UserRoutes);
  app.use('/api/movies', MovieRoutes);
 
  //* Crear un servidor HTTP usando la aplicación Express
  const server = http.createServer(app); // Crea un servidor HTTP con la aplicación Express
  return server; // Retorna el servidor configurado
};

export default createServer; // Exporta la función para su uso en otros módulos