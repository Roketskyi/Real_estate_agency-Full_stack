import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const { login, email } = createUserInput;
    
    // Check if user with the provided login or email already exists
    const existingUser = await this.userService.findByLoginOrEmail(login, email);
    if (existingUser) {
      throw new Error('Login or email already taken');
    }
    
    // If user does not exist, proceed with creation
    return this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' }) // Define the query name as 'users'
  findAllUsers() {
    return this.userService.findAll(); // Call the service method to fetch all users
  }

  @Query(() => User, { name: 'user' })
  findOneUser(@Args('id', { type: () => Int }) id: number) {
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