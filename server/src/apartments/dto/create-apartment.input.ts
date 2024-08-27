import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateApartmentInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => Int)
  price: number;

  @Field(() => Int)
  sellerId: number;

  @Field()
  locality: string;

  @Field(() => Int)
  floorInApartment: number;

  @Field(() => Int)
  numberOfRooms: number;

  @Field(() => Int)
  square: number;

  @Field()
  wallMaterial: string;

  @Field()
  heating: string;

  @Field(() => [String])
  imageUrls: string[];
}
