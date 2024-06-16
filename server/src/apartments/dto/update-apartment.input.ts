import { CreateApartmentInput } from './create-apartment.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateApartmentInput extends PartialType(CreateApartmentInput) {
  @Field(() => Int)
  id: number;
}
