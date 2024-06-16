import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateApartmentInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => Int)
  price: number;

  @Field()
  imageUrl: string;

  @Field(() => Int) // Assuming sellerId is of type Int
  sellerId: number;
}