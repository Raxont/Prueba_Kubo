import createServer from './infrastructure/server/server';
process.loadEnvFile();

const PORT = process.env.VITE_PORT_BACKEND;
const HOST = process.env.VITE_HOST;
const SERVER_URL = process.env.SERVER_URL || `http://${HOST}:${PORT}`;

//* Función principal que inicia la aplicación
const startApp = async () => {
    //* Crea el servidor Express utilizando la configuración definida en createServer
    const app = createServer();

    //* Determina los valores de host y puerto según la disponibilidad de SERVER_URL
    if (process.env.SERVER_URL) {
        app.listen(SERVER_URL, () => {
            console.log(`Servidor en ejecución en ${SERVER_URL}`);
        });
    } else {
        app.listen({ port: PORT, host: HOST }, () => {
            console.log(`Servidor en ejecución en http://${HOST}:${PORT}`);
        });
    }
};

//* Llama a la función para iniciar la aplicación
startApp();
