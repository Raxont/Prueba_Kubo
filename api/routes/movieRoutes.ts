import { Router } from 'express';
import { MovieController } from '../controllers/movieController';

const router = Router();
const movieController = new MovieController();

/**
 * Rutas relacionadas con la gestión de películas.
 * Define las rutas de la API y las asocia a los métodos del MovieController.
 */

/**
 * @route POST /movies
 * @description Crea una nueva película en la base de datos.
 * @access Público
 */
router.post('/', movieController.createMovie);

/**
 * @route GET /movies
 * @description Obtiene una lista de películas con soporte para filtros y paginación.
 * @access Público
 */
router.get('/', movieController.getMovies);

/**
 * @route GET /movies/new-releases
 * @description Obtiene las películas estrenadas en las últimas tres semanas.
 * @access Público
 */
router.get('/new-releases', movieController.getNewReleases);

export default router;
