import createServer from './infrastructure/server/server';
process.loadEnvFile();

const PORT = process.env.VITE_PORT_BACKEND;
const HOST = process.env.VITE_HOST;

//* Función principal que inicia la aplicación
const startApp = async () => {
    //* Crea el servidor Express utilizando la configuración definida en createServer
    const app = createServer();

    app.listen({ port: PORT, host: HOST }, () => {
        console.log(`Servidor en ejecución en http://${HOST}:${PORT}`);
    });
    
};

//* Llama a la función para iniciar la aplicación
startApp();
