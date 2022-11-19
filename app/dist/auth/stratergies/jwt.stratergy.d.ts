import { Strategy } from 'passport-jwt';
declare const JwtStratergy_base: new (...args: any[]) => Strategy;
export declare class JwtStratergy extends JwtStratergy_base {
    constructor();
    validate(payload: any): Promise<{
        userId: any;
        email: any;
        username: any;
    }>;
}
export {};
