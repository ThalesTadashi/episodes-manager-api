import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';
import { User } from '../entities/user.entity';


@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }
  
  async create(data: CreateUserInput) {
    const user = this.userRepository.create(data);

    // var valid = await this.userRepository.createQueryBuilder('user')
    // .where('user.email = :email', { email: data.email })
    // .getOne();

  // if (valid) {
  //   throw new BadRequestException('Esse E-mail já está sendo usado')
  // }

  const userSaved = await this.userRepository.save(user);

  if (!userSaved) {
    throw new InternalServerErrorException('Erro ao criar o usuário.');
  }
  return await this.findOne(userSaved.id);
  }

  async findAll(): Promise<User[]> {
    const result = await this.userRepository.find()

  return result;
  }

  async find(id: string) {
    const result = await this.findOne(id)

  return result;
  }

  async findOne(id: string) {
    const entity = await this.userRepository.createQueryBuilder('')

  if (!entity) {
    throw new BadRequestException('Não encontrado');
  }
  return entity;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}