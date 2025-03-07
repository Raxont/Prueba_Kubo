import createServer from './infrastructure/server/server'; 
import dotenv from 'dotenv';

// Solo carga el archivo .env en desarrollo
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
 
const PORT = process.env.PORT || process.env.VITE_PORT_BACKEND || 3000; 
 
//* Función principal que inicia la aplicación 
const startApp = async () => { 
    //* Crea el servidor Express utilizando la configuración definida en createServer 
    const app = createServer(); 
 
    app.listen(PORT, () => {
        console.log(`Servidor en ejecución en puerto ${PORT}`); 
    }); 

}; 
 
//* Llama a la función para iniciar la aplicación 
startApp();