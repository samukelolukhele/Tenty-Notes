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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthUser } from 'src/auth/user.decorator';
import { CreatUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UsersService } from 'src/users/services/users.service';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Observable, of } from 'rxjs';
import { join } from 'path';
import { cwd } from 'process';

const storage = diskStorage({
  destination: './uploads/profileimages',
  filename: (req, file, cb) => {
    const filename: string =
      path.parse(file.originalname.toUpperCase()).name.replace(/\s/g, '') +
      uuidv4();
    const extension: string = path.parse(file.originalname).ext;
    cb(null, `${filename}${extension}`);
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
  public async getById(@AuthUser() user: any) {
    return await this.serv.getById(user.userId);
  }

  @Post()
  public async create(@Body() user: CreatUserDto) {
    return await this.serv.create(user);
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
  @UseInterceptors(FileInterceptor('file', { storage: storage }))
  public uploadFile(@UploadedFile() file, @AuthUser() user: any) {
    return this.serv.updateById(user.userId, { profile_image: file.filename });
  }

  @Get('profile-image/:image')
  public getProfileImage(
    @Param('image') image: string,
    @Res() res: any,
  ): Observable<Object> {
    return of(
      res.sendFile(join(process.cwd(), 'uploads/profileimages/' + image)),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  public async delete(@AuthUser() user: any) {
    return await this.serv.delete(user.userId);
  }
}
