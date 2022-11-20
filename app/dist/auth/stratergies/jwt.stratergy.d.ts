import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
declare const JwtStratergy_base: new (...args: any[]) => Strategy;
export declare class JwtStratergy extends JwtStratergy_base {
    constructor(configService: ConfigService);
    validate(payload: any): Promise<{
        userId: any;
        email: any;
        username: any;
    }>;
}
export {};
