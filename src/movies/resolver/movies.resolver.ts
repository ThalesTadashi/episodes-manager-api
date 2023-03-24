import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { CreateMovieInput } from "../dto/create-movie.input";
import { UpdateMovieInput } from "../dto/update-movie.input";
import { Movie } from "../entities/movie.entity";
import { MoviesService } from "../service/movies.service";


@Resolver(() => Movie)
export class MoviesResolver {
  constructor(private readonly moviesService: MoviesService) {}

  @Mutation(() => Movie,{ name: 'createMovie', description: 'Create Movie' })
  async createMovie(@Args('data') data: CreateMovieInput) {
        return await this.moviesService.create(data);
  }

  @Query(() => [Movie], { name: 'movies', description: 'Return All Movies' })
  async movies(): Promise<Movie[]> {
      const users = await this.moviesService.findAllMovies();
      return users;
  }

  @Query(() => Movie, { name: 'movie' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.moviesService.findMovieById(id);
  }

  @Mutation(() => Movie)
  updateUser(@Args('data') data: UpdateMovieInput) {
    return this.moviesService.updateMovie(data.id, data);
  }

  @Mutation(() => Movie)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.moviesService.deleteMovie(id);
  }
}
