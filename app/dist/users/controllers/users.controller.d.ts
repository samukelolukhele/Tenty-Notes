import { CreatUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersService } from '../services/users.service';
import { Observable } from 'rxjs';
import { Response } from 'express';
export declare class UsersController {
    private serv;
    constructor(serv: UsersService);
    getAll(page?: number, limit?: number): Promise<import("nestjs-typeorm-paginate").Pagination<import("../users.entity").User, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    getByProfile(user: any): Promise<import("../users.entity").User>;
    getById(id: number): Promise<import("../users.entity").User>;
    create(user: CreatUserDto): Promise<import("@nestjs/common").UnauthorizedException | {
        access_token: string;
    }>;
    changePassword(user: any, password: any, res: Response): Promise<void>;
    update(user: any, updatedUser: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    uploadFile(file: any, user: any): Promise<any>;
    getProfileImage(image: string, res: any): Observable<Object>;
    delete(user: any): Promise<import("typeorm").DeleteResult>;
}
