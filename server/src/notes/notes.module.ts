import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { NotesController } from './controller/notes/notes.controller';
import { Note } from './notes.entity';
import { NotesService } from './service/notes/notes.service';

@Module({
  providers: [NotesService],
  imports: [TypeOrmModule.forFeature([Note, User])],
  controllers: [NotesController],
})
export class NotesModule {}
