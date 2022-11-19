import { Request } from 'express';
import { AuthService } from '../services/auth.service';
export declare class AuthController {
    private serv;
    constructor(serv: AuthService);
    login(req: Request): Promise<import("@nestjs/common").UnauthorizedException | {
        access_token: string;
    }>;
}
