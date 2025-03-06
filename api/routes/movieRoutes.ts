import { Router } from 'express';
import { MovieController } from '../controllers/movieController';

const router = Router();
const movieController = new MovieController();

/**
 * Rutas relacionadas con la gestión de películas.
 * Define las rutas de la API y las asocia a los métodos del MovieController.
 */
/**
 * @swagger
 * tags:
 *   name: Películas
 *   description: API para la gestión de películas
 */
/**
 * @swagger
 * components:
 *  schemas:
 *   Pelicula:
 *     type: object
 *     required:
 *       - title
 *       - releaseDate
 *       - categoryId
 *     properties:
 *       title:
 *         type: string
 *         example: "Inception"
 *       description:
 *         type: string
 *         example: "Una película sobre sueños dentro de sueños."
 *       releaseDate:
 *         type: string
 *         format: date-time
 *         example: "2010-07-16T00:00:00Z"
 *       categoryId:
 *         type: integer
 *         example: 1
 *   Pelicula1:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         example: 1
 *       title:
 *         type: string
 *         example: "Inception"
 *       description:
 *         type: string
 *         example: "Una película sobre sueños dentro de sueños."
 *       releaseDate:
 *         type: string
 *         format: date-time
 *         example: "2010-07-16T00:00:00Z"
 *       categoryId:
 *         type: integer
 *         example: 1
 *   PeliculaConCategoria:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         example: 6
 *       title:
 *         type: string
 *         example: "Pelicula 1"
 *       description:
 *         type: string
 *         example: "Descripcion de la pelicula 1"
 *       releaseDate:
 *         type: string
 *         format: date-time
 *         example: "2025-05-01T05:00:00.000Z"
 *       category:
 *         type: object
 *         properties:
 *           id:
 *             type: integer
 *             example: 2
 *           name:
 *             type: string
 *             example: "Suspenso"
 */

/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Crear una nueva película
 *     tags: [Películas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pelicula'
 *     responses:
 *       201:
 *         description: Película creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pelicula1'
 *       400:
 *         description: Datos de entrada inválidos
 *       500:
 *         description: Error al crear la película
 */
/**
 * @route POST /movies
 * @description Crea una nueva película en la base de datos.
 * @access Público
 */
router.post('/', movieController.createMovie);

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Obtener una lista de películas
 *     tags: [Películas]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de página para paginación
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Cantidad de resultados por página
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filtrar por título de película
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *         description: Filtrar por ID de categoría
 *       - in: query
 *         name: orderByDate
 *         schema:
 *           type: boolean
 *         description: Ordenar por fecha de estreno
 *     responses:
 *       200:
 *         description: Lista de películas obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pelicula1'
 *       500:
 *         description: Error al obtener las películas
 */
/**
 * @route GET /movies
 * @description Obtiene una lista de películas con soporte para filtros y paginación.
 * @access Público
 */
router.get('/', movieController.getMovies);

/**
 * @swagger
 * /api/movies/new-releases:
 *   get:
 *     summary: Obtener las películas estrenadas en las últimas tres semanas
 *     tags: [Películas]
 *     responses:
 *       200:
 *         description: Lista de películas novedosas obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PeliculaConCategoria'
 *       500:
 *         description: Error al obtener las películas novedosas
 */
/**
 * @route GET /movies/new-releases
 * @description Obtiene las películas estrenadas en las últimas tres semanas.
 * @access Público
 */
router.get('/new-releases', movieController.getNewReleases);

export default router;
