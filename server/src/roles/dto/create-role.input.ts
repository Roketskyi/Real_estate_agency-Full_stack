import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateRoleInput {
  @Field()
  @IsString()
  role_name: string; // Define the role_name field
}