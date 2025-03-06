import { PrismaClient, Movie } from '@prisma/client';
import { CreateMovieDto, MovieFilterParams, PaginatedResult, MovieViewModel } from '../types';

const prisma = new PrismaClient();

/**
 * Clase MovieService que gestiona las operaciones relacionadas con las películas.
 * Se encarga de la lógica de negocio y la comunicación con la base de datos.
 */
export class MovieService {
  /**
   * Crea una nueva película en la base de datos.
   * @param {CreateMovieDto} movieData - Datos de la película a crear.
   * @returns {Promise<Movie>} - Retorna la película creada.
   */
  async createMovie(movieData: CreateMovieDto): Promise<Movie> {
    return prisma.movie.create({
      data: movieData
    });
  }

  /**
   * Obtiene una lista de películas con filtros y paginación.
   * @param {MovieFilterParams} filters - Parámetros de filtrado y paginación.
   * @returns {Promise<PaginatedResult<MovieViewModel>>} - Retorna un objeto con la lista de películas y metadatos de paginación.
   */
  async getMovies(filters: MovieFilterParams): Promise<PaginatedResult<MovieViewModel>> {
    const { page = 1, limit = 10, title, categoryId, orderByDate = true } = filters;
    const skip = (page - 1) * limit;

    // Construcción de filtros
    const where: any = {};
    
    if (title) {
      where.title = {
        contains: title
      };
    }
    
    if (categoryId) {
      where.categoryId = categoryId;
    }

    // Definición del ordenamiento
    const orderBy: any = {};
    if (orderByDate) {
      orderBy.releaseDate = 'desc';
    }

    // Consulta de películas con filtros y paginación
    const [movies, total] = await Promise.all([
      prisma.movie.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          category: true
        }
      }),
      prisma.movie.count({ where })
    ]);

    // Transformación a ViewModel
    const movieViewModels = movies.map(movie => ({
      id: movie.id,
      title: movie.title,
      description: movie.description,
      releaseDate: movie.releaseDate,
      category: {
        id: movie.category.id,
        name: movie.category.name
      }
    }));

    // Cálculo del total de páginas
    const totalPages = Math.ceil(total / limit);

    return {
      data: movieViewModels,
      meta: {
        total,
        page,
        limit,
        totalPages
      }
    };
  }

  /**
   * Obtiene las películas estrenadas en las últimas tres semanas.
   * @returns {Promise<MovieViewModel[]>} - Retorna una lista de películas recientes.
   */
  async getNewReleases(): Promise<MovieViewModel[]> {
    // Cálculo de la fecha de hace 3 semanas
    const threeWeeksAgo = new Date();
    threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21);

    // Consulta de películas recientes
    const newReleases = await prisma.movie.findMany({
      where: {
        releaseDate: {
          gte: threeWeeksAgo
        }
      },
      include: {
        category: true
      },
      orderBy: {
        releaseDate: 'desc'
      }
    });

    // Transformación a ViewModel
    return newReleases.map(movie => ({
      id: movie.id,
      title: movie.title,
      description: movie.description,
      releaseDate: movie.releaseDate,
      category: {
        id: movie.category.id,
        name: movie.category.name
      }
    }));
  }
}
