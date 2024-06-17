import { Resolver, Mutation, Args, Context, Query, Field, Int, ObjectType } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './auth.guard'; // Переконайтеся, що правильно імпортуєте ваш власний Guard


@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => LoginResponse)
async login(
  @Args('loginOrEmail') loginOrEmail: string,
  @Args('password') password: string,
): Promise<LoginResponse> {
  const user = await this.authService.validateUser(loginOrEmail, password);
  const { accessToken, id } = await this.authService.login(user);
  return { accessToken, id };
}

  @Query(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async isLoggedIn(@Context() context): Promise<boolean> {
    const authorization = context.req.headers['authorization'];
    if (!authorization) {
      return false;
    }

    const token = authorization.replace('Bearer ', ''); // Перевірка токена без пробілу після 'Bearer'
    return await this.authService.verifyToken(token);
  }
}

// Оголосіть новий тип для зручності:
@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;

  @Field(() => Int)
  id: number;
}