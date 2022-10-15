import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthUser } from 'src/auth/user.decorator';
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

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  public async getById(@AuthUser() user: any) {
    return await this.serv.getById(user.userId);
  }

  @Post()
  public async create(@Body() user: CreatUserDto) {
    return await this.serv.create(user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  public async update(
    @AuthUser() user: any,
    @Body() updatedUser: UpdateUserDto,
  ) {
    console.log(user);
    return await this.serv.updateById(user.userId, updatedUser);
  }

  @Delete(':id')
  public async delete(@Param() id: any) {
    return await this.serv.delete(id);
  }
}
