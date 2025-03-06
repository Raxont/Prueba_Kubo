import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { CreateUserDto } from '../types';

const userService = new UserService();

/**
 * Clase UserController que maneja las operaciones relacionadas con los usuarios.
 * Se encarga de gestionar las solicitudes y respuestas HTTP relacionadas con los usuarios.
 */
export class UserController {
  /**
   * Crea un nuevo usuario en la base de datos.
   * @param {Request} req - Objeto de solicitud con los datos del usuario en el cuerpo.
   * @param {Response} res - Objeto de respuesta para enviar la respuesta al cliente.
   * @returns {Promise<void>} - Retorna una respuesta con el usuario creado o un mensaje de error.
   */
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData: CreateUserDto = req.body;
      
      // Validar datos de entrada
      if (!userData.name || !userData.email) {
        res.status(400).json({ error: 'Nombre y email son requeridos' });
        return;
      }
      
      // Crear usuario en la base de datos
      const user = await userService.createUser(userData);
      res.status(201).json(user);
    } catch (error: any) {
      // Manejo de errores en caso de conflicto de email duplicado
      if (error.code === 'P2002') {
        res.status(409).json({ error: 'Ya existe un usuario con ese email' });
      } else {
        res.status(500).json({ error: 'Error al crear el usuario' });
      }
    }
  }

  /**
   * Obtiene la lista de usuarios con las películas que han visto.
   * @param {Request} req - Objeto de solicitud.
   * @param {Response} res - Objeto de respuesta para enviar los datos obtenidos.
   * @returns {Promise<void>} - Retorna una lista de usuarios con sus películas vistas o un mensaje de error.
   */
  async getUsersWithViewedMovies(req: Request, res: Response): Promise<void> {
    try {
      // Obtener usuarios con películas vistas
      const users = await userService.getUsersWithViewedMovies();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener usuarios con películas vistas' });
    }
  }

  /**
   * Marca una película como vista por un usuario específico.
   * @param {Request} req - Objeto de solicitud con el ID del usuario y el ID de la película en los parámetros.
   * @param {Response} res - Objeto de respuesta para enviar la confirmación de la operación.
   * @returns {Promise<void>} - Retorna un mensaje de éxito o un mensaje de error.
   */
  async markMovieAsViewed(req: Request, res: Response): Promise<void> {
    try {
      const { userId, movieId } = req.params;
      
      // Validar que los parámetros estén presentes
      if (!userId || !movieId) {
        res.status(400).json({ error: 'UserId y MovieId son requeridos' });
        return;
      }
      
      // Marcar la película como vista
      await userService.markMovieAsViewed(parseInt(userId), parseInt(movieId));
      res.status(200).json({ message: 'Película marcada como vista correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al marcar película como vista' });
    }
  }
}
