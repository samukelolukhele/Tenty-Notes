import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatUserDto } from '../../users/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { User } from '../../users/users.entity';
import { Repository } from 'typeorm';
import { AuthService } from '../../auth/services/auth.service';
import { Bucket, Storage } from '@google-cloud/storage';
import { parse } from 'path';
import { userInfo } from 'os';

interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

@Injectable()
export class UsersService {
  private bucket: Bucket;
  private storage: Storage;

  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    @Inject(forwardRef(() => AuthService)) private auth: AuthService,
  ) {
    this.storage = new Storage({
      projectId: process.env.GCS_PROJECT,
      credentials: {
        client_email: process.env.GCS_CLIENT_EMAIL,
        private_key: process.env.GCS_PRIVATE_KEY.replace(/\\n/gm, '\n'),
      },
    });
    this.bucket = this.storage.bucket(process.env.GCS_BUCKET);
  }

  public async getAll() {
    return await this.repo.find({
      relations: {
        note: true,
      },
      select: {
        email: false,
        full_name: false,
        username: true,
        description: true,
        id: true,
      },
    });
  }

  public async create(user: CreatUserDto) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    if (await this.getByEmail(user.email)) return null;

    const newUser = {
      username: user.username,
      email: user.email.toLowerCase(),
      password: hashedPassword,
      profile_image: 'tenty-default-img.jpeg',
      description: "Hey I'm on Tenty Notes!",
      full_name: user.full_name,
    };

    await this.repo.save(newUser);

    return await this.auth.login(user);
  }

  public async getById(id: any) {
    return await this.repo.findOne({
      where: { id: id },
      relations: { note: true },
      select: { email: false },
    });
  }

  public async getProfile(id: any) {
    return await this.repo.findOne({
      where: { id: id },
      relations: { note: true },
    });
  }

  public async getByEmail(email: string) {
    return await this.repo.findOne({
      where: { email: email },
      relations: { note: true },
      select: { password: true, id: true },
    });
  }

  public async updatePassword(
    currentPassword: string,
    newPassword: string,
    user: any,
  ) {
    const foundUser = await this.repo.findOne({
      where: { id: user.id },
      relations: { note: true },
      select: { password: true, id: true },
    });

    if (!currentPassword) return null;

    const checkPassword: boolean = await bcrypt.compare(
      currentPassword,
      foundUser.password,
    );

    if (checkPassword == false) {
      return null;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    return await this.repo.update(foundUser.id, {
      ...(newPassword && { password: hashedPassword }),
    });
  }

  public async updateProfileImg(uploadedFile: File, id: number): Promise<any> {
    const user = await this.getById(id);
    if (user.profile_image != 'tenty-default-img.jpeg') {
      try {
        const fileToBeDeleted = this.bucket.file(user.profile_image);

        await fileToBeDeleted.delete();
      } catch (e) {
        console.log({
          Error: e.message,
          Response:
            'Since there was no image found the users image is now set to the default',
        });
      }
      await this.updateById(id, { profile_image: 'tenty-default-img.jpeg' });
    }

    const setFilename = (uploadedFile: File): string => {
      const fileName = parse(uploadedFile.originalname);
      return `${fileName.name}-${Date.now()}${fileName.ext}`
        .replace(/^\.+/g, '')
        .replace(/^\/+/g, '')
        .replace(/\r|\n/g, '_');
    };

    const filename = setFilename(uploadedFile);

    const file = this.bucket.file(filename);

    try {
      await file.save(uploadedFile.buffer, {
        contentType: uploadedFile.mimetype,
      });
    } catch (e) {
      console.log(e.message);
    }

    return this.updateById(id, { profile_image: file.name });
  }

  public async updateById(id: any, user: any) {
    return await this.repo.update(id, {
      ...(user.username && { username: user.username }),
      ...(user.email && { email: user.email }),
      ...(user.full_name && { full_name: user.full_name }),
      ...(user.description && { description: user.description }),
      ...(user.profile_image && { profile_image: user.profile_image }),
    });
  }

  public async delete(id: any) {
    return await this.repo.delete(id);
  }
}
