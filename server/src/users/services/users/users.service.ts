import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  public async getAll() {
    return await this.repo.find();
  }

  public async create(user: CreatUserDto) {
    return await this.repo.save(user);
  }

  public async getById(id: any) {
    return await this.repo.getId(id);
  }

  public async updateById(id: any, user: UpdateUserDto) {
    return await this.repo.update(id, user);
  }

  public async delete(id: any) {
    return await this.repo.delete(id);
  }
}
