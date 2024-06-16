import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from './roles.service';
import { RolesResolver } from './roles.resolver';
import { Role } from './entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]), // Include Role entity in TypeORM module
  ],
  providers: [RolesResolver, RolesService],
  exports: [TypeOrmModule],
})
export class RolesModule {}