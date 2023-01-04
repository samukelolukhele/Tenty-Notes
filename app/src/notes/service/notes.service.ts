import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { use } from 'passport';
import { CreateNoteDto } from '../../notes/dto/create-note.dto';
import { UpdateNoteDto } from '../../notes/dto/update-note.dto';
import { Note } from '../../notes/notes.entity';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import {
  Pagination,
  paginate,
  IPaginationOptions,
  IPaginationMeta,
} from 'nestjs-typeorm-paginate';
import { map } from 'rxjs/operators';

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

  public async paginate(
    options: IPaginationOptions,
  ): Promise<Pagination<Note>> {
    return paginate<Note>(this.repo, options, {
      relations: ['author'],
      order: { id: 'DESC' },
    });
  }

  public async getByUserId(
    options: IPaginationOptions,
    userId: number,
  ): Promise<Pagination<Note>> {
    return paginate<Note>(this.repo, options, {
      relations: ['author'],
      order: { id: 'DESC' },
      where: { authorId: Number(userId) },
    });
  }

  public async create(note: CreateNoteDto) {
    const date = new Date().toISOString().slice(0, 10);

    if (!note.title || !note.body || !note.authorId)
      throw new HttpException(
        'The required fields were not provided.',
        HttpStatus.BAD_REQUEST,
      );

    console.log(note);

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

  public async update(userId: any, id: any, note: UpdateNoteDto) {
    const noteToUpdate = await this.repo.findOne({
      where: { id: id },
      select: {
        title: true,
        body: true,
      },
    });

    if (!noteToUpdate.id) return 'Note not found';

    if (noteToUpdate.authorId != userId) return new UnauthorizedException();

    await this.repo.update(id, {
      ...(note.title && { title: note.title }),
      ...(note.body && { body: note.body }),
    });
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

  public async updateById(id: number, userId: number, note: UpdateNoteDto) {
    const noteToUpdate = await this.getById(id);
    const date = new Date().toISOString().slice(0, 10);

    if (noteToUpdate.authorId !== userId)
      throw new UnauthorizedException('', 'This note belongs to another user.');

    await this.repo.update(id, {
      ...(note.title && { title: note.title }),
      ...(note.body && { body: note.body }),
      ...(note.is_pinned && { is_pinned: note.is_pinned }),
      authorId: noteToUpdate.authorId,
      updated_at: date,
    });

    return await this.getById(id);
  }

  public async delete(userId: any, id: number) {
    const noteToDel = await this.getById(id);

    if (noteToDel.authorId != userId) throw new UnauthorizedException();

    return await this.repo.delete(id);
  }
}
