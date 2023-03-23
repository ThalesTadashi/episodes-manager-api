import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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

  async findAllUsers(): Promise<User[]> {
    const users = await this.userRepository.createQueryBuilder('users')
    .where('users.deletedAt IS NULL')
    .getMany();
    return users
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.createQueryBuilder('users')
      .where('users.deletedAt IS NULL')
      .andWhere('users.id = :id', { id: id })
      .getOne();

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }
    return user;
  }

  async create(data: CreateUserInput) {
    const user = this.userRepository.create(data);

    var valid = await this.userRepository.createQueryBuilder('user')
      .where('user.email = :email', { email: data.email })
      .getOne();

    if (valid) {
      throw new BadRequestException('Esse E-mail já está sendo usado')
    }

    const userSaved = await this.userRepository.save(user);

    if (!userSaved) {
      throw new InternalServerErrorException('Erro ao criar o usuário.');
    }
    return await this.findUserById(userSaved.id);
  }

  async updateUser(id: string, data: UpdateUserInput): Promise<User> {
    const user = await this.findUserById(id);
    await this.userRepository.save({ user, ...data });
    const userUpdated = this.userRepository.create({ ...user, ...data })
    return userUpdated;
  }


  async deleteUser(id: string): Promise<boolean> {
    const user = await this.findUserById(id);
    const deleted = await this.userRepository.delete(user);
    if (deleted) {
      return true;
    }
    return false;
  }
}