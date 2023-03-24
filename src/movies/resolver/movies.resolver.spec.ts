import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from '../service/movies.service';
import { MoviesResolver } from './movies.resolver';

describe('MoviesResolver', () => {
  let resolver: MoviesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesResolver, MoviesService],
    }).compile();

    resolver = module.get<MoviesResolver>(MoviesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
