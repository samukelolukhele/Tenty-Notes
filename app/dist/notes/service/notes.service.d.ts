import { UnauthorizedException } from '@nestjs/common';
import { CreateNoteDto } from '../../notes/dto/create-note.dto';
import { UpdateNoteDto } from '../../notes/dto/update-note.dto';
import { Note } from '../../notes/notes.entity';
import { Repository } from 'typeorm';
import { Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
export declare class NotesService {
    private readonly repo;
    constructor(repo: Repository<Note>);
    getAll(): Promise<Note[]>;
    paginate(options: IPaginationOptions): Promise<Pagination<Note>>;
    getByUserId(options: IPaginationOptions, userId: number): Promise<Pagination<Note>>;
    create(note: CreateNoteDto): Promise<Note>;
    update(userId: any, id: any, note: UpdateNoteDto): Promise<Note | "Note not found" | UnauthorizedException>;
    getById(id: number): Promise<Note>;
    updateById(id: number, userId: number, note: UpdateNoteDto): Promise<Note>;
    delete(userId: any, id: number): Promise<import("typeorm").DeleteResult>;
}
