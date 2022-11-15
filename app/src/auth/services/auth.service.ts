import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.getByEmail(email);

    if (!user) return null;

    if (await bcrypt.compare(pass, user.password)) {
      return user;
    }

    return null;
  }

  async login(user: any) {
    const foundUser = await this.usersService.getByEmail(user.email);

    if (!foundUser) return new UnauthorizedException();

    const payload = {
      email: foundUser.email,
      username: foundUser.username,
      sub: foundUser.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
