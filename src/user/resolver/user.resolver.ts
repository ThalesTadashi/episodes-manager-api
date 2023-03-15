import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from '../service/user.service';
import { User } from '../entities/user.entity';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') data: CreateUserInput) {
    const user = await this.userService.create(data);
        return user;
  }

  @Query(() => [User], { name: 'users', description: 'Return All Users' })
  async users(): Promise<User[]> {
      const users = await this.userService.findAll();
      return users;
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}