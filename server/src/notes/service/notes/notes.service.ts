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
    const user = await this.userRepo.findOneBy({ id: parseInt(note.authorId) });

    const newNote = await this.repo.create({
      title: note.title,
      body: note.body,
      author: user.username,
      authorId: note.authorId,
      isPinned: note.isPinned,
    });

    return this.repo.save(newNote);
  }
}
