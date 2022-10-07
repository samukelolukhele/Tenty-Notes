import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateNoteDto } from 'src/notes/dto/create-note.dto';
import { NotesService } from 'src/notes/service/notes/notes.service';

@Controller('notes')
export class NotesController {
  constructor(private serv: NotesService) {}

  @Get()
  async getAll() {
    return await this.serv.getAll();
  }

  @Post()
  async create(@Body() note: CreateNoteDto) {
    return await this.serv.create(note);
  }
}
