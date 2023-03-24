import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateMovieInput } from "../dto/create-movie.input";
import { UpdateMovieInput } from "../dto/update-movie.input";
import { Movie } from "../entities/movie.entity";


@Injectable()
export class MoviesService {

  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) { }

  async findAllMovies(): Promise<Movie[]> {
    const users = await this.movieRepository.createQueryBuilder('movies')
    .getMany();
    return users
  }

  async findMovieById(id: string): Promise<Movie> {
    const user = await this.movieRepository.createQueryBuilder('movies')
      .where('movies.id = :id', { id: id })
      .getOne();

    if (!user) {
      throw new NotFoundException('Filme não encontrado.');
    }
    return user;
  }

  async create(data: CreateMovieInput) {
    const entity = this.movieRepository.create(data);
    
    const movieSaved = await this.movieRepository.save(entity);

    if (!movieSaved) {
      throw new InternalServerErrorException('Erro ao criar o modelo de filme.');
    }
    return await this.findMovieById(movieSaved.id);
  }

  async updateMovie(id: string, data: UpdateMovieInput): Promise<Movie> {
    const user = await this.findMovieById(id);
    await this.movieRepository.save({ user, ...data });
    const userUpdated = this.movieRepository.create({ ...user, ...data })
    return userUpdated;
  }


  async deleteMovie(id: string): Promise<boolean> {
    const entity = await this.findMovieById(id);
    const deleted = await this.movieRepository.remove(entity);
    if (deleted) {
      return true;
    }
    return false;
  }
}
