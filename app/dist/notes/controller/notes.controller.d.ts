import { CreateNoteDto } from '../../notes/dto/create-note.dto';
import { NotesService } from '../../notes/service/notes.service';
export declare class NotesController {
    private serv;
    constructor(serv: NotesService);
    getAll(): Promise<import("../notes.entity").Note[]>;
    getById(id: number): Promise<import("../notes.entity").Note>;
    getNotesByUser(id: number): Promise<import("../notes.entity").Note>;
    create(user: any, note: CreateNoteDto): Promise<import("../notes.entity").Note>;
    update(user: any, id: number, note: CreateNoteDto): Promise<import("../notes.entity").Note | import("@nestjs/common").UnauthorizedException | "Note not found">;
    delete(user: any, id: number): Promise<import("@nestjs/common").UnauthorizedException | import("typeorm").DeleteResult>;
}
