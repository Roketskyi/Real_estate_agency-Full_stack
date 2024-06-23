import { Resolver, Mutation, Args, Context, Query, Field, Int, ObjectType } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './auth.guard';
import { Role } from 'src/roles/entities/role.entity';


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
    const { accessToken, id, avatar, role } = await this.authService.login(user);
    return { accessToken, id, avatar, role };
  }

  @Query(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async isLoggedIn(@Context() context): Promise<boolean> {
    const authorization = context.req.headers['authorization'];
    if (!authorization) {
      return false;
    }

    const token = authorization.replace('Bearer ', '');
    return await this.authService.verifyToken(token);
  }
}

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;

  @Field(() => Int)
  id: number;

  @Field({ nullable: true }) // Поле avatar може бути null, якщо воно не встановлене
  avatar?: string;

  @Field(() => Role, { nullable: true })
  role?: Role; // Переконайтеся, що `Role` правильно імпортовано з entities/role.entity
}