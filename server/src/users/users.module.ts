import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './users.entity';

@Module({
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
