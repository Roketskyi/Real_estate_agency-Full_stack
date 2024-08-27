import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateApartmentInput } from './dto/create-apartment.input';
import { UpdateApartmentInput } from './dto/update-apartment.input';
import { Apartment } from './entities/apartment.entity';
import { ApartmentImage } from 'src/apartment-image/entities/apartment-image.entity';

@Injectable()
export class ApartmentsService {
  imageRepository: any;
  constructor(
    @InjectRepository(Apartment)
    private readonly apartmentRepository: Repository<Apartment>,
  ) {}

  async create(createApartmentInput: CreateApartmentInput): Promise<Apartment> {
    const { imageUrls, ...apartmentData } = createApartmentInput;
    
    const newApartment = this.apartmentRepository.create(apartmentData);
    await this.apartmentRepository.save(newApartment);
  
    // Зберігаємо зображення
    const images = imageUrls.map(url => {
      const image = new ApartmentImage();
      image.url = url;
      image.apartmentId = newApartment.id;
      return image;
    });
    await this.imageRepository.save(images);
  
    return this.findOne(newApartment.id);
  }
  

  async findAll(): Promise<Apartment[]> {
    return this.apartmentRepository.find({ relations: ['images', 'seller'] });
  }

  async findOne(id: number): Promise<Apartment> {
    return this.apartmentRepository.findOneOrFail({ 
      where: { id }, 
      relations: ['images', 'seller'] 
    });
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
