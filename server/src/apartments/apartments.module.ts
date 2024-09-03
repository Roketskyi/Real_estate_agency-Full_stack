import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apartment } from './entities/apartment.entity';
import { ApartmentImage } from 'src/apartment-image/entities/apartment-image.entity';
import { ApartmentsResolver } from './apartments.resolver';
import { ApartmentsService } from './apartments.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Apartment, ApartmentImage]),
    UserModule,
  ],
  providers: [ApartmentsResolver, ApartmentsService],
  exports: [ApartmentsService],
})
export class ApartmentsModule {}
