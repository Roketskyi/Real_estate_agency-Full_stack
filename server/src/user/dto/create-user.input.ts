import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString, IsEmail, IsInt, IsOptional } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  login: string;

  @Field()
  @IsString()
  password: string;

  @Field()
  @IsEmail()
  email: string;

  @Field(() => Int, { defaultValue: 2 })
  @IsInt()
  role: number;

  @Field({ nullable: true }) // or remove @Field() if not needed in GraphQL
  @IsString()
  @IsOptional()
  avatar?: string;
}
