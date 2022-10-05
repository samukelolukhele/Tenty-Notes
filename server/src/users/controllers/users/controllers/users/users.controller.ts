import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { CreatUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private serv: UsersService) {}

  @Get()
  public async getAll() {
    return await this.serv.getAll();
  }

  @Post()
  public async create(@Body() user: CreatUserDto) {
    return await this.serv.create(user);
  }

  @Put(':id')
  public async update(@Param() id: any, @Body() user: UpdateUserDto) {
    return await this.serv.updateById(id, user);
  }

  @Delete(':id')
  public async delete(@Param() id: any) {
    return await this.serv.delete(id);
  }
}
