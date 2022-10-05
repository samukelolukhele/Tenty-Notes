// import { Injectable } from '@nestjs/common';
// import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// @Injectable()
// export class ConfigService {
//   constructor(private env: { [k: string]: string | undefined }) {}

//   private getValue(key: string | number, thrownOnMissing = true): string {
//     const value = this.env[key];
//     if (!value && thrownOnMissing) {
//       throw new Error(`config error - missing env.${key}`);
//     }
//     return value;
//   }

//   public ensureValues(keys: string[]) {
//     keys.forEach((k) => this.getValue(k, true));
//     return this;
//   }

//   public getPort() {
//     return this.getValue('PORT', true);
//   }

//   public isProduction() {
//     const mode = this.getValue('MODE', true);
//     return mode != 'DEV';
//   }

//   public getTypeOrmConfig(): TypeOrmModuleOptions {
//     return {
//       type: 'postgres',

//       host: this.getValue('POSTGRES_HOST'),
//       port: this.getValue(5432),
//       username: this.getValue('POSTGRES_USER'),
//       password: this.getValue('POSTGRES_PASSWORD'),
//       database: this.getValue('POSTGRES_DATABASE'),
//     };
//   }
// }
