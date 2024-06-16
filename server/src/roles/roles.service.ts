import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity'; // Adjust path as necessary
import { CreateRoleInput } from './dto/create-role.input';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createRoleInput: CreateRoleInput): Promise<Role> {
    const { role_name } = createRoleInput; // Destructure role_name from createRoleInput
    const newRole = this.roleRepository.create({ role_name }); // Create a new role entity
    return await this.roleRepository.save(newRole); // Save and return the new role
  }

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find(); // Retrieve all roles
  }
}