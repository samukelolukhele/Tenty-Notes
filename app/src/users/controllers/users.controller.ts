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
  public async getAll() {
    return await this.serv.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  public async getByProfile(@AuthUser() user: any) {
    return await this.serv.getProfile(user.userId);
  }

  @Get('/profile/:id')
  public async getById(@Param('id') id: number) {
    return this.serv.getById(id);
  }

  @Post()
  public async create(@Body() user: CreatUserDto) {
    return await this.serv.create(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/change-password')
  public async changePassword(
    @AuthUser() user: any,
    @Body() password: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.serv.updatePassword(
      password.currentPassword,
      password.newPassword,
      user.userId,
    );

    if (!result) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        status: 'Unauthorized',
        message: 'Password does not match the one stored on the database',
      });
    } else if (result) {
      res.status(HttpStatus.CREATED).json({
        status: 'Created',
        message: 'Password was changed successfully',
      });
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
    return this.serv.updateProfileImg(file, user.userId);
  }

  @Get('profile-image/:image')
  public getProfileImage(
    @Param('image') image: string,
    @Res() res: any,
  ): Observable<Object> {
    return of(
      res.sendFile(
        join(
          process.cwd(),
          'https://storage.googleapis.com/tentynotes/' + image,
        ),
      ),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  public async delete(@AuthUser() user: any) {
    return await this.serv.delete(user.userId);
  }
}
