import { UnauthorizedException } from '@nestjs/common';
import { CreateNoteDto } from '../../notes/dto/create-note.dto';
import { UpdateNoteDto } from '../../notes/dto/update-note.dto';
import { Note } from '../../notes/notes.entity';
import { Repository } from 'typeorm';
export declare class NotesService {
    private readonly repo;
    constructor(repo: Repository<Note>);
    getAll(): Promise<Note[]>;
    create(note: CreateNoteDto): Promise<Note>;
    update(userId: any, id: any, note: UpdateNoteDto): Promise<Note | UnauthorizedException | "Note not found">;
    getById(id: number): Promise<Note>;
    getByUserId(userId: number): Promise<Note>;
    updateById(id: number, userId: number, note: UpdateNoteDto): Promise<UnauthorizedException | import("typeorm").UpdateResult>;
    delete(userId: any, id: number): Promise<UnauthorizedException | import("typeorm").DeleteResult>;
}
