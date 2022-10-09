import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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

  @Put(':id')
  async update(@Param() id: any, @Body() note: CreateNoteDto) {
    return await this.serv.update(id, note);
  }
}
