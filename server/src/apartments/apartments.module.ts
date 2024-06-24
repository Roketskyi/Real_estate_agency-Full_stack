import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apartment } from './entities/apartment.entity';
import { ApartmentsResolver } from './apartments.resolver';
import { ApartmentsService } from './apartments.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Apartment]),
    UserModule,
  ],
  providers: [ApartmentsResolver, ApartmentsService],
  exports: [ApartmentsService],
})
export class ApartmentsModule {}