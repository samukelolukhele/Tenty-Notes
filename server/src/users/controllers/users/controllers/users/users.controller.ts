import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Get } from '@nestjs/common';
import { CreatUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { threadId } from 'worker_threads';

@Controller('users')
export class UsersController {
  constructor(private serv: UsersService) {}

  @Get()
  public async getAll() {
    return await this.serv.getAll();
  }

  @Get('/id/:id')
  public async getById(@Param('id') id: string) {
    return await this.serv.getById(id);
  }

  @Get('/email')
  public async getByEmail(@Req() req: any) {
    console.log(req.email);
    return await this.serv.getByEmail(req.body.email);
  }

  @Post()
  public async create(@Body() user: CreatUserDto) {
    return await this.serv.create(user);
  }

  @Post('/login')
  public async login(@Body() user: LoginUserDto) {
    return await this.serv.login(user);
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
