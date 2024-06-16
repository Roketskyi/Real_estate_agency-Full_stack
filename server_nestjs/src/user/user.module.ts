// user.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { RolesModule } from '../roles/roles.module';  // Коректний шлях до модуля Roles
import { UserResolver } from './user.resolver'; // Додано резолвер

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]), // Додаємо Role до TypeOrmModule
    RolesModule,
  ],
  providers: [UserService, UserResolver], // Додаємо UserResolver до провайдерів
  exports: [UserService],
})
export class UserModule {}
