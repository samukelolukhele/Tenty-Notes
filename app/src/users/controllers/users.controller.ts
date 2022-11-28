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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AuthUser } from '../../auth/user.decorator';
import { CreatUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersService } from '../services/users.service';
import * as Multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Observable, of } from 'rxjs';
import path, { join } from 'path';
import { Response } from 'express';
import { Storage } from '@google-cloud/storage';
import * as multerGoogleStorage from 'multer-google-storage';

const gcStorage = multerGoogleStorage.storageEngine({
  bucket: process.env.GCS_BUCKET,
  projectId: process.env.GCS_PROJECT,
  keyFilename: './credentials.json',
  credentials: {
    client_email: process.env.GCS_CLIENT_EMAIL,
    private_key: process.env.GCS_PRIVATE_KEY,
  },
});

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
      storage: gcStorage,
    }),
  )
  public uploadFile(@UploadedFile() file, @AuthUser() user: any) {
    return this.serv.updateById(user.userId, { profile_image: file.filename });
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
