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
    return await this.repo.find({
      relations: {
        author: true,
      },
    });
  }

  public async create(note: CreateNoteDto) {
    const date = new Date().toISOString().slice(0, 10);

    const newNote = await this.repo.create({
      title: note.title,
      body: note.body,
      is_pinned: false,
      authorId: note.authorId,
      created_at: date,
      updated_at: date,
    });

    return this.repo.save(newNote);
  }

  public async update(id: any, note: UpdateNoteDto) {
    const noteToUpdate = await this.repo.findOne(id);

    if (!noteToUpdate.id) return 'Note not found';

    await this.repo.update(id, note);
    return this.repo.findOne(id);
  }

  public async getById(id: number) {
    return await this.repo.findOne({
      where: { id: id },
      relations: {
        author: true,
      },
    });
  }

  public async getByUserId(userId: number) {
    return await this.repo.findOne({
      where: { authorId: userId },
      relations: {
        author: true,
      },
    });
  }

  public async updateById(id: number, userId: number, note: UpdateNoteDto) {
    const noteToUpdate = await this.getById(id);
    const date = new Date().toISOString().slice(0, 10);

    if (noteToUpdate.authorId !== userId) return new UnauthorizedException();

    return await this.repo.update(id, {
      ...(note.title && { title: note.title }),
      ...(note.body && { body: note.body }),
      ...(note.is_pinned && { is_pinned: note.is_pinned }),
      updated_at: date,
    });
  }

  public async delete(userId: any, id: number) {
    const noteToDel = await this.getById(id);

    if (noteToDel.authorId != userId) return new UnauthorizedException();

    return await this.repo.delete(id);
  }
}
