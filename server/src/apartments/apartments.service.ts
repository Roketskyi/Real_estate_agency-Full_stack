import { Injectable } from '@nestjs/common';
import { CreateApartmentInput } from './dto/create-apartment.input';
import { UpdateApartmentInput } from './dto/update-apartment.input';

@Injectable()
export class ApartmentsService {
  create(createApartmentInput: CreateApartmentInput) {
    return 'This action adds a new apartment';
  }

  findAll() {
    return `This action returns all apartments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} apartment`;
  }

  update(id: number, updateApartmentInput: UpdateApartmentInput) {
    return `This action updates a #${id} apartment`;
  }

  remove(id: number) {
    return `This action removes a #${id} apartment`;
  }
}
