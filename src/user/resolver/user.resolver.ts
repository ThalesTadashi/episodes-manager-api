import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from '../service/user.service';
import { User } from '../entities/user.entity';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User,{ name: 'createUser', description: 'Create User' })
  async createUser(@Args('data') data: CreateUserInput) {
        return await this.userService.create(data);
  }

  @Query(() => [User], { name: 'users', description: 'Return All Users' })
  async users(): Promise<User[]> {
      const users = await this.userService.findAllUsers();
      return users;
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.userService.findUserById(id);
  }

  @Mutation(() => User)
  updateUser(@Args('data') data: UpdateUserInput) {
    return this.userService.updateUser(data.id, data);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.userService.deleteUser(id);
  }
}