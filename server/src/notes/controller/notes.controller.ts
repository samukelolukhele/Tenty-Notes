import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthUser } from 'src/auth/user.decorator';
import { CreateNoteDto } from 'src/notes/dto/create-note.dto';
import { NotesService } from 'src/notes/service/notes/notes.service';

@Controller('notes')
export class NotesController {
  constructor(private serv: NotesService) {}

  @Get()
  async getAll() {
    return await this.serv.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.serv.getById(id);
  }

  @Get('notes-by-user/:id')
  async getNotesByUser(@Param('id') id: number) {
    return await this.serv.getByUserId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@AuthUser() user: any, @Body() note: CreateNoteDto) {
    return await this.serv.create({
      title: note.title,
      body: note.body,
      authorId: user.userId,
      is_pinned: false,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@AuthUser() user: any, @Body() note: CreateNoteDto) {
    return await this.serv.update(user.userId, note);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@AuthUser() user: any, @Param('id') id: number) {
    return await this.serv.delete(user.userId, id);
  }
}
