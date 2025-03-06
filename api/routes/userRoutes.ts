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
 */
/**
 * @swagger
 * components:
 *  schemas:
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
 * /usuarios/{id}:
 *   get:
 *     summary: Obtiene un usuario por id
 *     tags : [Usuarios]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: string
 *        required: true
 *        description: El id del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/Usuarios'
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
 * @route POST /users/:userId/view-movie/:movieId
 * @description Marca una película como vista por un usuario específico.
 * @param {string} userId - ID del usuario.
 * @param {string} movieId - ID de la película.
 * @access Público
 */
router.post('/:userId/view-movie/:movieId', userController.markMovieAsViewed);

export default router;