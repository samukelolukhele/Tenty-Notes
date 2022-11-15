import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './users.entity';

@Module({
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
