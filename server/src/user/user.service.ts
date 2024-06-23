import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import * as argon2 from 'argon2';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async findByLoginOrEmail(login: string, email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: [{ login }, { email }] });
  }  

  async create(createUserInput: CreateUserInput): Promise<User> {
    const hashedPassword = await argon2.hash(createUserInput.password);

    const newUser = new User();
    newUser.login = createUserInput.login;
    newUser.password = hashedPassword;
    newUser.email = createUserInput.email;
    newUser.role = await this.findRoleById(createUserInput.role);
    newUser.createdAt = new Date();
    newUser.avatar = 'http://192.168.0.192:4000/uploads/avatars/default.png';

    return await this.userRepository.save(newUser);
  }

  async validateUser(loginOrEmail: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: [
        { login: loginOrEmail },
        { email: loginOrEmail }
      ],
      relations: ['role']
    });

    
    if (user && await argon2.verify(user.password, password)) {
      return user;
    }

    return null;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['role'] });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.findOne(id);

    if (updateUserInput.login) {
      user.login = updateUserInput.login;
    }

    if (updateUserInput.password) {
      user.password = await argon2.hash(updateUserInput.password);
    }

    if (updateUserInput.email) {
      user.email = updateUserInput.email;
    }

    if (updateUserInput.role) {
      user.role = await this.findRoleById(updateUserInput.role);
    }

    if (updateUserInput.avatar) {
      user.avatar = updateUserInput.avatar;
    }

    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<string> {
    const user = await this.findOne(id);
    
    if (user) {
      await this.userRepository.remove(user);
      return "complete";
    }
    
    throw new NotFoundException(`User with ID ${id} not found`);
  }

  private async findRoleById(roleId: number): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { role_id: roleId } });
    if (!role) {
      throw new NotFoundException(`Role with ID ${roleId} not found`);
    }
    return role;
  }
}
