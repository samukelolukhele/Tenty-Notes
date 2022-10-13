import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './stratergies/local.stratergy';
import { UsersModule } from 'src/users/users.module';
import { jwtConstants } from './constants';
import { JwtStratergy } from './stratergies/jwt.stratergy';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1hour' },
    }),
  ],
  providers: [AuthService, JwtStratergy, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
