import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AuthUser } from '../../auth/user.decorator';
import { CreateNoteDto } from '../../notes/dto/create-note.dto';
import { NotesService } from '../../notes/service/notes.service';
import { Note } from '../notes.entity';

@Controller('notes')
export class NotesController {
  constructor(private serv: NotesService) {}

  @Get()
  async paginate(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<Note>> {
    limit = limit > 10 ? 10 : limit;

    return this.serv.paginate({
      page,
      limit,
      route: 'notes',
    });
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.serv.getById(id);
  }

  @Get('notes-by-user/:id')
  async getNotesByUser(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(2), ParseIntPipe) limit: number = 10,
    @Param('id') id: number,
  ) {
    return await this.serv.getByUserId(
      { page, limit, route: 'notes' },
      Number(id),
    );
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
  @Patch(':id')
  async update(
    @AuthUser() user: any,
    @Param('id') id: number,
    @Body() note: CreateNoteDto,
  ) {
    return await this.serv.update(user.userId, id, note);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@AuthUser() user: any, @Param('id') id: number) {
    return await this.serv.delete(user.userId, id);
  }
}
