import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateApartmentInput } from './dto/create-apartment.input';
import { UpdateApartmentInput } from './dto/update-apartment.input';
import { Apartment } from './entities/apartment.entity'; // Ensure correct import

@Injectable()
export class ApartmentsService {
  constructor(
    @InjectRepository(Apartment)
    private readonly apartmentRepository: Repository<Apartment>,
  ) {}

  async create(createApartmentInput: CreateApartmentInput): Promise<Apartment> {
    const newApartment = this.apartmentRepository.create(createApartmentInput);

    // Save the apartment
    await this.apartmentRepository.save(newApartment);

    // Fetch the apartment with the associated seller using query builder
    const savedApartment = await this.apartmentRepository
      .createQueryBuilder('apartment')
      .leftJoinAndSelect('apartment.seller', 'seller')
      .where('apartment.id = :id', { id: newApartment.id })
      .getOne();

    if (!savedApartment) {
      throw new NotFoundException(`Apartment with id ${newApartment.id} not found.`);
    }

    return savedApartment;
  }

  async findAll(): Promise<Apartment[]> {
    return this.apartmentRepository.find({ relations: ['seller'] });
  }

  async findOne(id: number): Promise<Apartment> {
    const apartment = await this.apartmentRepository.findOneBy({ id });

    if (!apartment) {
      throw new NotFoundException(`Apartment with id ${id} not found.`);
    }

    await this.apartmentRepository.findOneOrFail({ where: { id }, relations: ['seller'] });

    return apartment;
  }

  async update(id: number, updateApartmentInput: UpdateApartmentInput): Promise<Apartment> {
    await this.apartmentRepository.update(id, updateApartmentInput);
    return this.findOne(id);
  }

  async remove(id: number): Promise<Apartment> {
    const apartment = await this.findOne(id);
    await this.apartmentRepository.remove(apartment);
    return apartment;
  }
}
