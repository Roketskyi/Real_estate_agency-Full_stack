import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateApartmentInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
