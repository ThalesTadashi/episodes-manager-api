import { Module } from '@nestjs/common';
import { MoviesService } from './service/movies.service';
import { MoviesResolver } from './resolver/movies.resolver';
import { Movie } from './entities/movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Movie
    ]),
  ],
  providers: [MoviesResolver, MoviesService]
})
export class MoviesModule {}
