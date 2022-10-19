import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNoteDto } from 'src/notes/dto/create-note.dto';
import { UpdateNoteDto } from 'src/notes/dto/update-note.dto';
import { Note } from 'src/notes/notes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotesService {
  constructor(
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

  public async update(id: any, note: UpdateNoteDto) {
    const noteToUpdate = await this.repo.findOne(id);

    if (!noteToUpdate.id) return 'Note not found';

    await this.repo.update(id, note);
    return this.repo.findOne(id);
  }

  public async getById(id: any) {
    return await this.repo.findOneBy(id);
  }

  public async delete(userId: any, id: any) {
    const noteToDel = await this.getById(id);

    if (noteToDel.author_id !== userId) return new UnauthorizedException();

    return await this.repo.delete(id);
  }
}
