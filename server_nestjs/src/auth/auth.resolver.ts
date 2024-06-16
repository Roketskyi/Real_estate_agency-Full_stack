import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './auth.guard'; // Переконайтеся, що правильно імпортуєте ваш власний Guard


@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('loginOrEmail') loginOrEmail: string,
    @Args('password') password: string,
  ): Promise<string> {
    const user = await this.authService.validateUser(loginOrEmail, password);
    const { accessToken } = await this.authService.login(user);
    return accessToken;
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
