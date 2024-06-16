import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ApartmentsService } from './apartments.service';
import { Apartment } from './entities/apartment.entity';
import { CreateApartmentInput } from './dto/create-apartment.input';
import { UpdateApartmentInput } from './dto/update-apartment.input';

@Resolver(() => Apartment)
export class ApartmentsResolver {
  constructor(private readonly apartmentsService: ApartmentsService) {}

  @Mutation(() => Apartment)
  async createApartment(@Args('createApartmentInput') createApartmentInput: CreateApartmentInput) {
    return this.apartmentsService.create(createApartmentInput); // Потрібно створити метод create в apartments.service.ts
  }

  @Query(() => [Apartment], { name: 'apartments' })
  findAll() {
    return this.apartmentsService.findAll();
  }

  @Query(() => Apartment, { name: 'apartment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.apartmentsService.findOne(id);
  }

  @Mutation(() => Apartment)
  updateApartment(@Args('updateApartmentInput') updateApartmentInput: UpdateApartmentInput) {
    return this.apartmentsService.update(updateApartmentInput.id, updateApartmentInput);
  }

  @Mutation(() => Apartment)
  removeApartment(@Args('id', { type: () => Int }) id: number) {
    return this.apartmentsService.remove(id);
  }
}
