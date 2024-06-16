import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apartment } from './entities/apartment.entity'; // відповідний імпорт

import { ApartmentsResolver } from './apartments.resolver'; // Потрібно створити резолвер
import { ApartmentsService } from './apartments.service'; // Потрібно створити сервіс
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Apartment]), // Потрібно імпортувати TypeOrmModule та зареєструвати Apartment
    UserModule, // Якщо не вже імпортували
  ],
  providers: [ApartmentsResolver, ApartmentsService], // Потрібно зареєструвати резолвер та сервіс
  exports: [ApartmentsService], // Якщо сервіс експортується
})
export class ApartmentsModule {}