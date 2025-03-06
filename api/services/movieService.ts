import { PrismaClient, Movie } from '@prisma/client';
import { CreateMovieDto, MovieFilterParams, PaginatedResult, MovieViewModel } from '../types';

const prisma = new PrismaClient();

export class MovieService {
  async createMovie(movieData: CreateMovieDto): Promise<Movie> {
    return prisma.movie.create({
      data: movieData
    });
  }

  async getMovies(filters: MovieFilterParams): Promise<PaginatedResult<MovieViewModel>> {
    const { page = 1, limit = 10, title, categoryId, orderByDate = true } = filters;
    const skip = (page - 1) * limit;

    // Construir filtros
    const where: any = {};
    
    if (title) {
      where.title = {
        contains: title
      };
    }
    
    if (categoryId) {
      where.categoryId = categoryId;
    }

    // Ordenamiento
    const orderBy: any = {};
    if (orderByDate) {
      orderBy.releaseDate = 'desc';
    }

    // Ejecutar consulta con paginación
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

    // Transformar a ViewModel
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

    // Calcular total de páginas
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

  async getNewReleases(): Promise<MovieViewModel[]> {
    // Calcular fecha de hace 3 semanas
    const threeWeeksAgo = new Date();
    threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21);

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