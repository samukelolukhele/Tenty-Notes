import { UnauthorizedException } from '@nestjs/common';
import { CreatUserDto } from '../../users/dto/create-user.dto';
import { User } from '../../users/users.entity';
import { Repository } from 'typeorm';
import { AuthService } from '../../auth/services/auth.service';
export declare class UsersService {
    private readonly repo;
    private auth;
    constructor(repo: Repository<User>, auth: AuthService);
    getAll(): Promise<User[]>;
    create(user: CreatUserDto): Promise<UnauthorizedException | {
        access_token: string;
    }>;
    getById(id: any): Promise<User>;
    getProfile(id: any): Promise<User>;
    getByEmail(email: string): Promise<User>;
    updatePassword(currentPassword: string, newPassword: string, user: any): Promise<import("typeorm").UpdateResult>;
    updateById(id: any, user: any): Promise<import("typeorm").UpdateResult>;
    delete(id: any): Promise<import("typeorm").DeleteResult>;
}
