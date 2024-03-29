/// <reference types="node" />
import { CreatUserDto } from '../../users/dto/create-user.dto';
import { User } from '../../users/users.entity';
import { Repository } from 'typeorm';
import { AuthService } from '../../auth/services/auth.service';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
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
export declare class UsersService {
    private readonly repo;
    private auth;
    private bucket;
    private storage;
    constructor(repo: Repository<User>, auth: AuthService);
    getUsers(options: IPaginationOptions): Promise<Pagination<User>>;
    create(user: CreatUserDto): Promise<import("@nestjs/common").UnauthorizedException | {
        access_token: string;
    }>;
    getById(id: any): Promise<User>;
    getProfile(id: any): Promise<User>;
    getByEmail(email: string): Promise<User>;
    getByUsername(username: string): Promise<User>;
    updatePassword(currentPassword: string, newPassword: string, user: any): Promise<import("typeorm").UpdateResult>;
    updateProfileImg(uploadedFile: File, id: number): Promise<any>;
    updateById(id: any, user: any): Promise<import("typeorm").UpdateResult>;
    delete(id: any): Promise<import("typeorm").DeleteResult>;
}
export {};
