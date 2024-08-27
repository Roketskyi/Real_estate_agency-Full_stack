import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ApartmentImageService } from './apartment-image.service';
import { ApartmentImage } from './entities/apartment-image.entity';
import { CreateApartmentImageInput } from './dto/create-apartment-image.input';
import { UpdateApartmentImageInput } from './dto/update-apartment-image.input';

@Resolver(() => ApartmentImage)
export class ApartmentImageResolver {
  constructor(private readonly apartmentImageService: ApartmentImageService) {}

  @Mutation(() => ApartmentImage)
  createApartmentImage(@Args('createApartmentImageInput') createApartmentImageInput: CreateApartmentImageInput) {
    return this.apartmentImageService.create(createApartmentImageInput);
  }

  @Query(() => [ApartmentImage], { name: 'apartmentImage' })
  findAll() {
    return this.apartmentImageService.findAll();
  }

  @Query(() => ApartmentImage, { name: 'apartmentImage' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.apartmentImageService.findOne(id);
  }

  @Mutation(() => ApartmentImage)
  updateApartmentImage(@Args('updateApartmentImageInput') updateApartmentImageInput: UpdateApartmentImageInput) {
    return this.apartmentImageService.update(updateApartmentImageInput.id, updateApartmentImageInput);
  }

  @Mutation(() => ApartmentImage)
  removeApartmentImage(@Args('id', { type: () => Int }) id: number) {
    return this.apartmentImageService.remove(id);
  }
}
