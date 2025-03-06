import { Router } from 'express';
import { UserController } from '../controllers/userController';

const router = Router();
const userController = new UserController();

// Crear un usuario
router.post('/', userController.createUser);

// Listar usuarios con películas vistas
router.get('/viewed-movies', userController.getUsersWithViewedMovies);

// Marcar película como vista
router.post('/:userId/view-movie/:movieId', userController.markMovieAsViewed);

export default router;