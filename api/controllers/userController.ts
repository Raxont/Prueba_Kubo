import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { CreateUserDto } from '../types';

const userService = new UserService();

export class UserController {
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData: CreateUserDto = req.body;
      
      // Validar datos de entrada
      if (!userData.name || !userData.email) {
        res.status(400).json({ error: 'Nombre y email son requeridos' });
        return;
      }
      
      const user = await userService.createUser(userData);
      res.status(201).json(user);
    } catch (error: any) {
      if (error.code === 'P2002') {
        res.status(409).json({ error: 'Ya existe un usuario con ese email' });
      } else {
        res.status(500).json({ error: 'Error al crear el usuario' });
      }
    }
  }

  async getUsersWithViewedMovies(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getUsersWithViewedMovies();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener usuarios con películas vistas' });
    }
  }

  async markMovieAsViewed(req: Request, res: Response): Promise<void> {
    try {
      const { userId, movieId } = req.params;
      
      if (!userId || !movieId) {
        res.status(400).json({ error: 'UserId y MovieId son requeridos' });
        return;
      }
      
      await userService.markMovieAsViewed(parseInt(userId), parseInt(movieId));
      res.status(200).json({ message: 'Película marcada como vista correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al marcar película como vista' });
    }
  }
}