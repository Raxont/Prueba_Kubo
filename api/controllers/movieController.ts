import { Request, Response } from 'express';
import { MovieService } from '../services/movieService';
import { CreateMovieDto, MovieFilterParams } from '../types';

const movieService = new MovieService();

export class MovieController {
  async createMovie(req: Request, res: Response): Promise<void> {
    try {
      const movieData: CreateMovieDto = {
        ...req.body,
        releaseDate: new Date(req.body.releaseDate)
      };
      
      // Validar datos de entrada
      if (!movieData.title || !movieData.releaseDate || !movieData.categoryId) {
        res.status(400).json({ error: 'Título, fecha de estreno y categoría son requeridos' });
        return;
      }
      
      const movie = await movieService.createMovie(movieData);
      res.status(201).json(movie);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la película' });
    }
  }

  async getMovies(req: Request, res: Response): Promise<void> {
    try {
      const filters: MovieFilterParams = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 10,
        title: req.query.title as string,
        categoryId: req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined,
        orderByDate: req.query.orderByDate === 'false' ? false : true
      };
      
      const paginatedMovies = await movieService.getMovies(filters);
      res.json(paginatedMovies);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las películas' });
    }
  }

  async getNewReleases(req: Request, res: Response): Promise<void> {
    try {
      const newReleases = await movieService.getNewReleases();
      res.json(newReleases);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las novedades' });
    }
  }
}