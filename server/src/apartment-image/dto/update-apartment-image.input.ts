import { CreateApartmentImageInput } from './create-apartment-image.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateApartmentImageInput extends PartialType(CreateApartmentImageInput) {
  @Field(() => Int)
  id: number;
}
