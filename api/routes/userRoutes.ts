import { Router } from 'express';
import { UserController } from '../controllers/userController';

const router = Router();
const userController = new UserController();

/**
 * Rutas relacionadas con la gestión de usuarios y sus películas vistas.
 * Define las rutas de la API y las asocia a los métodos del UserController.
 */
/**
 * @swagger
 * tags:
 *  name: Usuarios
 *  description: Api para la gestion de usuarios
 */
/**
 * @swagger
 * components:
 *  schemas:
 *   Usuarios:
 *       type: object
 *       required:
 *        - name
 *        - email
 *       properties:
 *         name:
 *           type: string
 *           example: "Pedro"
 *         email:
 *           type: string
 *           example: "pedro@gmail.com"
 *   Usuarios1:
 *       type: object
 *       required:
 *        - name
 *        - email
 *       properties:
 *         id:
 *           type: int
 *           example: 1
 *         nombre:
 *           type: string
 *           example: "Pedro"
 *         email:
 *           type: string
 *           example: "pedro@gmail.com"
 *   Usuarios2:
 *     type: object
 *     required:
 *       - name
 *       - email
 *     properties:
 *       id:
 *         type: integer
 *         example: 1
 *       name:
 *         type: string
 *         example: "Pedro"
 *       email:
 *         type: string
 *         example: "pedro@gmail.com"
 *       viewedMovies:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             id: 
 *               type: integer
 *               example: 1
 *             title:
 *               type: string
 *               example: "Pelicula 1"
 *             description:
 *               type: string
 *               example: "Descripcion pelicula 1"
 *             releaseDate:
 *               type: string
 *               format: date-time
 *               example: "2025-03-06T00:00:00Z"
 *             category:
 *               type: object
 *               properties:
 *                 id: 
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Terror"
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags : [Usuarios]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *          $ref: '#/components/schemas/Usuarios'
 *     responses:
 *       200:
 *         description: Usuario creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/Usuarios1'
 *       500:
 *         description: Error al crear el usuario
 *       400:
 *         description: Nombre y email son requeridos
 *       429:
 *         description: Tasa de solicitudes superada. Intenta de nuevo más tarde
 */
/**
 * @route POST /users
 * @description Crea un nuevo usuario en la base de datos.
 * @access Público
 */
router.post('/', userController.createUser);

/**
 * @swagger
 * /api/users/viewed-movies:
 *   get:
 *     summary: Obtiene los usuarios con sus peliculas vistas
 *     tags : [Usuarios]
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/Usuarios2'
 *       400:
 *         description: No se encontro ningun usuario
 *       401:
 *         description: Desautorizado Sesion no encontrada
 *       429:
 *         description: Tasa de solicitudes superada. Intenta de nuevo más tarde
 *       500:
 *         description: Error en la obtencion del usuario
 */
/**
 * @route GET /users/viewed-movies
 * @description Obtiene la lista de usuarios con las películas que han visto.
 * @access Público
 */
router.get('/viewed-movies', userController.getUsersWithViewedMovies);

/**
 * @swagger
 * /api/users/{userId}/view-movie/{movieId}:
 *   post:
 *     summary: Marcar una película como vista
 *     tags: 
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la película
 *     responses:
 *       200:
 *         description: Película marcada como vista correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Película marcada como vista correctamente"
 *       400:
 *         description: Parámetros inválidos (UserId y MovieId son requeridos)
 *       500:
 *         description: Error al marcar la película como vista
 *       429:
 *         description: Tasa de solicitudes superada. Intenta de nuevo más tarde
 */
/**
 * @route POST /users/:userId/view-movie/:movieId
 * @description Marca una película como vista por un usuario específico.
 * @param {string} userId - ID del usuario.
 * @param {string} movieId - ID de la película.
 * @access Público
 */
router.post('/:userId/view-movie/:movieId', userController.markMovieAsViewed);

export default router;