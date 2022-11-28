import { Pagination } from 'nestjs-typeorm-paginate';
import { CreateNoteDto } from '../../notes/dto/create-note.dto';
import { NotesService } from '../../notes/service/notes.service';
import { Note } from '../notes.entity';
export declare class NotesController {
    private serv;
    constructor(serv: NotesService);
    paginate(page?: number, limit?: number): Promise<Pagination<Note>>;
    getById(id: number): Promise<Note>;
    getNotesByUser(page: number, limit: number, id: number): Promise<Pagination<Note, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    create(user: any, note: CreateNoteDto): Promise<Note>;
    update(user: any, id: number, note: CreateNoteDto): Promise<Note | "Note not found" | import("@nestjs/common").UnauthorizedException>;
    delete(user: any, id: number): Promise<import("@nestjs/common").UnauthorizedException | import("typeorm").DeleteResult>;
}
