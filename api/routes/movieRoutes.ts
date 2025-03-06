import { Router } from 'express';
import { MovieController } from '../controllers/movieController';

const router = Router();
const movieController = new MovieController();

// Crear una película
router.post('/', movieController.createMovie);

// Listar películas con filtros y paginación
router.get('/', movieController.getMovies);

// Obtener novedades (películas de menos de 3 semanas)
router.get('/new-releases', movieController.getNewReleases);

export default router;