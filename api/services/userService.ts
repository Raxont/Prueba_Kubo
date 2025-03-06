import { PrismaClient, User } from '@prisma/client';
import { CreateUserDto, UserWithViewedMovies } from '../types';

const prisma = new PrismaClient();

export class UserService {
  async createUser(userData: CreateUserDto): Promise<User> {
    return prisma.user.create({
      data: userData
    });
  }

  async getUsersWithViewedMovies(): Promise<UserWithViewedMovies[]> {
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