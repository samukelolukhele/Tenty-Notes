import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
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
    @Query('limit', new DefaultValuePipe(2), ParseIntPipe) limit: number = 2,
  ): Promise<Pagination<Note>> {
    // limit = limit > 10 ? 10 : limit;

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
    try {
      return await this.serv.getByUserId(
        { page, limit, route: 'notes' },
        Number(id),
      );
    } catch (err) {
      throw new HttpException(
        'Failed to retrieve notes.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@AuthUser() user: any, @Body() note: CreateNoteDto) {
    try {
      return await this.serv.create({
        title: note.title,
        body: note.body,
        authorId: user.userId,
        is_pinned: false,
      });
    } catch (err) {
      if (err.status !== 400)
        throw new HttpException(
          'Failed to create note.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );

      throw new HttpException(
        'The required fields were not provided.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @AuthUser() user: any,
    @Param('id') id: number,
    @Body() note: CreateNoteDto,
  ) {
    try {
      return await this.serv.updateById(id, user.userId, note);
    } catch (err) {
      console.log(err);

      if (err.status === 401)
        throw new HttpException(
          'Failed to update note.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );

      throw new HttpException(
        'This note belongs to another user.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@AuthUser() user: any, @Param('id') id: number) {
    try {
      return await this.serv.delete(user.userId, id);
    } catch (err) {
      if (err.status !== 401)
        throw new HttpException(
          'Failed to delete note.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );

      throw new HttpException(
        'This note belongs to another user.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
