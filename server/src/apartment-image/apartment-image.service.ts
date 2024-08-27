import { Injectable } from '@nestjs/common';
import { CreateApartmentImageInput } from './dto/create-apartment-image.input';
import { UpdateApartmentImageInput } from './dto/update-apartment-image.input';

@Injectable()
export class ApartmentImageService {
  create(createApartmentImageInput: CreateApartmentImageInput) {
    return 'This action adds a new apartmentImage';
  }

  findAll() {
    return `This action returns all apartmentImage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} apartmentImage`;
  }

  update(id: number, updateApartmentImageInput: UpdateApartmentImageInput) {
    return `This action updates a #${id} apartmentImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} apartmentImage`;
  }
}
