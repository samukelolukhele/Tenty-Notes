import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNoteDto } from 'src/notes/dto/create-note.dto';
import { Note } from 'src/notes/notes.entity';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Note) private readonly repo: Repository<Note>,
  ) {}

  public async getAll() {
    return await this.repo.find();
  }

  public async create(note: CreateNoteDto) {
    const newNote = await this.repo.create({
      title: note.title,
      body: note.body,
      author_id: note.author_id,
    });

    return this.repo.save(newNote);
  }
}
