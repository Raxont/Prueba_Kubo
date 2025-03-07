# Prueba tecnica Kubo S.A.S

Esta prueba tecnica es una API para la gestión de películas, permitiendo la creación, consulta y categorización de películas en una base de datos. Sigue una arquitectura **MVC** para mantener una estructura ordenada y modular.

## Tecnologías Utilizadas

- **Backend:** Node.js, Express.js, TypeScript
- **ORM**: Prisma
- **Base de datos:** SQLite
- **Documentación:** Swagger

## Instalación y Configuración

### Requisitos Previos

Asegúrate de tener instalado:

- **Node.js**
- **npm**

Usar la version **23.0.0** de Node.js:

```
nvm install 23.0.0
nvm use 23.0.0
```

### Clonar el Repositorio

```
git clone https://github.com/Raxont/Prueba_Kubo.git
```

Usar la rama **main** para pruebas locales, la rama **deploy** solo esta para el correcto funcionamiento en el servidor de render.

### Instalación de Dependencias

```
npm install
```

### Configuración de Variables de Entorno

Crea un archivo **.env** en la raíz del proyecto y configura las variables necesarias:

```bash
VITE_HOST=
VITE_PORT_BACKEND=
SERVER_URL=
```

### Estructura de carpetas

```
│   .env               					# Variables de entorno
│   .gitignore         					# Archivos y carpetas que Git debe ignorar
│   package.json       					# Gestión de dependencias y scripts del proyecto
│   README.md          					# Documentación del proyecto
│   tsconfig.json      					# Configuración de TypeScript
├───api                					# Contiene la lógica principal del backend
│   │   app.ts         					# Archivo principal que inicializa la app
│   ├───controllers    					# Controla los datos
│   │       movieController.ts  		# Controlador de películas
│   │       userController.ts   		# Controlador de usuarios
│   ├───infrastructure  				# Infraestructura del backend
│   │   ├───middlewares 				# Middleware para procesamiento de solicitudes
│   │   │       rateLimit.ts  			# Límite de solicitudes para evitar abuso
│   │   │       swagger.ts    			# Configuración de Swagger para documentación de la API
│   │   └───server     					# Configuración y arranque del servidor
│   │           server.ts  				# Archivo que inicia el servidor con Express
│   ├───models        					# Modelos de datos utilizados en la aplicación
│   │   └───prisma    					# Modelos de Prisma para la base de datos
│   │       │   categorias.ts   		# Inserta datos prestablecidos a la base de datos
│   │       │   schema.prisma   		# Esquema principal de la base de datos con Prisma
│   ├───routes        					# Definición de rutas de la API
│   │       movieRoutes.ts  			# Rutas relacionadas con películas
│   │       userRoutes.ts   			# Rutas relacionadas con usuarios
│   ├───services      					# Servicios que manejan la lógica de negocio y acceso a datos
│   │       movieService.ts  			# Lógica y operaciones de películas
│   │       userService.ts   			# Lógica y operaciones de usuarios
│   └───types         					# Definición de tipos TypeScript para la aplicación
│           index.ts  					# Archivo que centraliza las definiciones de tipos
```

### Ejecución del proyectó

Ejecuta estos comandos primero:

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:categorias
```

Despues de eso, puede ejecutar el proyecto correctamente con:

```bash
npm run dev
```

## Endpoints

### **Películas**

| Método | Endpoint                   | Descripción                                             |
| ------ | -------------------------- | ------------------------------------------------------- |
| `POST` | `/api/movies`              | Crea una nueva película                                 |
| `GET`  | `/api/movies`              | Obtiene una lista de películas con filtros y paginación |
| `GET`  | `/api/movies/new-releases` | Obtiene las películas estrenadas recientemente          |

### **Usuarios**

| Método | Endpoint                                 | Descripción                                  |
| ------ | ---------------------------------------- | -------------------------------------------- |
| `POST` | `/api/users`                             | Crea un nuevo usuario                        |
| `GET`  | `/api/users/viewed-movies`               | Obtiene usuarios con sus películas vistas    |
| `POST` | `/api/users/:userId/view-movie/:movieId` | Marca una película como vista por un usuario |

## Documentación de la API

La API está documentada con Swagger. Para acceder a la documentación, inicia el servidor y visita:

```http
http://localhost:3000/api/
```

### URL del servidor de render:

```http
https://prueba-kubo.onrender.com
```

### Usado por:

Este proyecto puede ser usado por:

- Campuslands
- Kubo S.A.S