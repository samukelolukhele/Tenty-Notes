import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Get,
  HttpStatus,
  BadRequestException,
  HttpException,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AuthUser } from '../../auth/user.decorator';
import { CreatUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersService } from '../services/users.service';
import * as Multer from 'multer';
import { Observable, of } from 'rxjs';
import path, { join } from 'path';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private serv: UsersService) {}

  @Get()
  public async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number = 20,
  ) {
    try {
      return await this.serv.getUsers({ page, limit, route: 'users' });
    } catch (e) {
      throw new HttpException(
        'Failed to get users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  public async getByProfile(@AuthUser() user: any) {
    try {
      return await this.serv.getProfile(user.userId);
    } catch (e) {
      throw new HttpException('Failed to get profile', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/profile/:id')
  public async getById(@Param('id') id: number) {
    try {
      return this.serv.getById(id);
    } catch (err) {
      throw new HttpException('Failed to get user', HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  public async create(@Body() user: CreatUserDto) {
    return await this.serv.create(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/change-password')
  public async changePassword(@AuthUser() user: any, @Body() password: any) {
    try {
      await this.serv.updatePassword(
        password.currentPassword,
        password.newPassword,
        user.userId,
      );
    } catch (err) {
      if (!password.newPassword)
        throw new HttpException(
          'No new password was provided',
          HttpStatus.BAD_REQUEST,
        );

      if (!password.currentPassword)
        throw new HttpException(
          'Original password not provided',
          HttpStatus.BAD_REQUEST,
        );

      throw new HttpException(
        'The password does not match the original one.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  public async update(
    @AuthUser() user: any,
    @Body() updatedUser: UpdateUserDto,
  ) {
    return await this.serv.updateById(user.userId, updatedUser);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: Multer.memoryStorage(),
      limits: { fileSize: 2097152, files: 1 },
      fileFilter: (req, file, callback) => {
        return file.mimetype.match(/image\/(jpg|jpeg|png|gif)$/)
          ? callback(null, true)
          : callback(
              new BadRequestException('Only image files are allowed'),
              false,
            );
      },
    }),
  )
  public uploadFile(@UploadedFile() file, @AuthUser() user: any) {
    try {
      return this.serv.updateProfileImg(file, user.userId);
    } catch (e) {
      if (!file)
        throw new HttpException(
          'No file was received.',
          HttpStatus.BAD_REQUEST,
        );

      throw new HttpException(
        'Failed to upload file.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('profile-image/:image')
  public getProfileImage(
    @Param('image') image: string,
    @Res() res: any,
  ): Observable<Object> {
    try {
      return of(
        res.sendFile(
          join(
            process.cwd(),
            'https://storage.googleapis.com/tentynotes/' + image,
          ),
        ),
      );
    } catch (e) {
      throw new HttpException('File not found.', HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  public async delete(@AuthUser() user: any) {
    try {
      return await this.serv.delete(user.userId);
    } catch (e) {
      throw new HttpException(
        'Failed to delete user.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
