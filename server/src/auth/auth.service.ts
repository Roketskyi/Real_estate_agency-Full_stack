import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginOrEmail: string, password: string): Promise<User> {
    const user = await this.userService.validateUser(loginOrEmail, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async verifyToken(token: string): Promise<boolean> {
    try {
      await this.jwtService.verifyAsync(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  async login(user: User): Promise<{ accessToken: string, id: number, avatar: string, role: Role }> {
    const payload = { username: user.login, sub: user.id, role_id: user.role.role_id };
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken,
      id: user.id,
      avatar: user.avatar,
      role: user.role,
    };
  }
}