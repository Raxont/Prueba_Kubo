import createServer from './infrastructure/server/server';
process.loadEnvFile();

//* Función principal que inicia la aplicación
const startApp = async () => {

    //* Crea el servidor Express utilizando la configuración definida en createServer
    const app = createServer();

    //* Inicia el servidor y lo escucha en el puerto y host definidos en las variables de entorno
    app.listen({port: process.env.VITE_PORT_BACKEND, host:process.env.VITE_HOST}, () => {
        //* Mensaje en consola que confirma que el servidor está en ejecución
        console.log(`http://${process.env.VITE_HOST}:${process.env.VITE_PORT_BACKEND}`);
    });
};

//* Llama a la función para iniciar la aplicación
startApp();