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

  @Field({ defaultValue: '0' })
  @IsString()
  phone1?: string;

  @Field({ defaultValue: '0' })
  @IsString()
  phone2?: string;

  @Field(() => Int, { defaultValue: 2 })
  @IsInt()
  role: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  avatar?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  firstName: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  lastName: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  middleName: string;
}
