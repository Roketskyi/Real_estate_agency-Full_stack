import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString, IsEmail, IsInt } from 'class-validator';

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

  @Field(() => Int, { defaultValue: 1 })
  @IsInt()
  role: number;
}
