export interface PaginationParams {
    page: number;
    limit: number;
  }
  
  export interface MovieFilterParams extends PaginationParams {
    title?: string;
    categoryId?: number;
    orderByDate?: boolean;
  }
  
  export interface CreateUserDto {
    name: string;
    email: string;
  }
  
  export interface CreateMovieDto {
    title: string;
    description?: string;
    releaseDate: Date;
    categoryId: number;
  }
  
  export interface MovieViewModel {
    id: number;
    title: string;
    description?: string | null;
    releaseDate: Date;
    category: {
      id: number;
      name: string;
    };
  }
  
  export interface PaginatedResult<T> {
    data: T[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }
  
  export interface UserWithViewedMovies {
    id: number;
    name: string;
    email: string;
    viewedMovies: MovieViewModel[];
  }