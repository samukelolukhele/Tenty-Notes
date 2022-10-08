import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  public async getAll() {
    return await this.repo.find();
  }

  public async create(user: CreatUserDto) {
    // const salt = await bcrypt.genSalt(20);
    const hash = await bcrypt.hashSync(user.password, 10);

    const newUser = this.repo.create({
      username: user.username,
      email: user.email,
      password: user.password,
    });

    return await this.repo.save(newUser);
  }

  public async getById(id: any) {
    return await this.repo.findOneBy({ id: id });
  }

  public async updateById(id: any, user: UpdateUserDto) {
    return await this.repo.update(id, user);
  }

  public async delete(id: any) {
    return await this.repo.delete(id);
  }
}
