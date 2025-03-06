import { PrismaClient, User } from '@prisma/client';
import { CreateUserDto, UserWithViewedMovies } from '../types';

const prisma = new PrismaClient();

/**
 * Clase UserService que gestiona las operaciones relacionadas con los usuarios.
 * Se encarga de la lógica de negocio y la comunicación con la base de datos.
 */
export class UserService {
  /**
   * Crea un nuevo usuario en la base de datos.
   * @param {CreateUserDto} userData - Datos del usuario a crear.
   * @returns {Promise<User>} - Retorna el usuario creado.
   */
  async createUser(userData: CreateUserDto): Promise<User> {
    return prisma.user.create({
      data: userData
    });
  }

  /**
   * Obtiene la lista de usuarios junto con las películas que han visto.
   * @returns {Promise<UserWithViewedMovies[]>} - Retorna un arreglo de usuarios con sus películas vistas.
   */
  async getUsersWithViewedMovies(): Promise<UserWithViewedMovies[]> {
    // Consulta de usuarios con las películas que han visto
    const users = await prisma.user.findMany({
      include: {
        viewedMovies: {
          include: {
            movie: {
              include: {
                category: true
              }
            }
          }
        }
      }
    });

    // Transformación de datos a ViewModel
    return users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      viewedMovies: user.viewedMovies.map(view => ({
        id: view.movie.id,
        title: view.movie.title,
        description: view.movie.description,
        releaseDate: view.movie.releaseDate,
        category: {
          id: view.movie.category.id,
          name: view.movie.category.name
        }
      }))
    }));
  }

  /**
   * Marca una película como vista por un usuario específico.
   * Si ya ha sido vista, se actualiza la fecha de visualización.
   * @param {number} userId - ID del usuario.
   * @param {number} movieId - ID de la película.
   * @returns {Promise<void>} - No retorna ningún valor.
   */
  async markMovieAsViewed(userId: number, movieId: number): Promise<void> {
    await prisma.movieView.upsert({
      where: {
        userId_movieId: {
          userId,
          movieId
        }
      },
      update: {
        viewedAt: new Date()
      },
      create: {
        userId,
        movieId
      }
    });
  }
}
