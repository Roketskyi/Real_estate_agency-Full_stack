import { Module } from '@nestjs/common';
import { ApartmentImageService } from './apartment-image.service';
import { ApartmentImageResolver } from './apartment-image.resolver';

@Module({
  providers: [ApartmentImageResolver, ApartmentImageService],
})
export class ApartmentImageModule {}
