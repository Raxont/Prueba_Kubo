import { Request, Response } from 'express';
import { MovieService } from '../services/movieService';
import { CreateMovieDto, MovieFilterParams } from '../types';

const movieService = new MovieService();

/**
 * Clase MovieController que maneja las operaciones relacionadas con las películas.
 * Se encarga de procesar las solicitudes HTTP y comunicarse con el servicio de películas.
 */
export class MovieController {
  /**
   * Crea una nueva película en la base de datos.
   * @param {Request} req - Objeto de solicitud con los datos de la película en el cuerpo.
   * @param {Response} res - Objeto de respuesta para enviar la respuesta al cliente.
   * @returns {Promise<void>} - Retorna una respuesta con la película creada o un mensaje de error.
   */
  async createMovie(req: Request, res: Response): Promise<void> {
    try {
      const movieData: CreateMovieDto = {
        ...req.body,
        releaseDate: new Date(req.body.releaseDate) // Convertir la fecha de estreno a tipo Date
      };
      
      // Validar datos de entrada
      if (!movieData.title || !movieData.releaseDate || !movieData.categoryId) {
        res.status(400).json({ error: 'Título, fecha de estreno y categoría son requeridos' });
        return;
      }
      
      // Crear la película en la base de datos
      const movie = await movieService.createMovie(movieData);
      res.status(201).json(movie);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la película' });
    }
  }

  /**
   * Obtiene una lista paginada de películas, permitiendo filtros por título y categoría.
   * @param {Request} req - Objeto de solicitud con parámetros de filtrado y paginación en la URL.
   * @param {Response} res - Objeto de respuesta para enviar la lista de películas.
   * @returns {Promise<void>} - Retorna una lista paginada de películas o un mensaje de error.
   */
  async getMovies(req: Request, res: Response): Promise<void> {
    try {
      // Extraer filtros desde los parámetros de la URL
      const filters: MovieFilterParams = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 10,
        title: req.query.title as string,
        categoryId: req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined,
        orderByDate: req.query.orderByDate === 'false' ? false : true
      };
      
      // Obtener películas con paginación
      const paginatedMovies = await movieService.getMovies(filters);
      res.json(paginatedMovies);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las películas' });
    }
  }

  /**
   * Obtiene una lista de las películas más recientes (estrenadas en las últimas 3 semanas).
   * @param {Request} req - Objeto de solicitud.
   * @param {Response} res - Objeto de respuesta para enviar la lista de novedades.
   * @returns {Promise<void>} - Retorna una lista de películas recientes o un mensaje de error.
   */
  async getNewReleases(req: Request, res: Response): Promise<void> {
    try {
      // Obtener películas estrenadas en las últimas 3 semanas
      const newReleases = await movieService.getNewReleases();
      res.json(newReleases);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las novedades' });
    }
  }
}
