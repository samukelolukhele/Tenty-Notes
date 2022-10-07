import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({
    description: 'Title of the note',
    example: 'Fundamentals of OOP',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Contents of the note',
    example: 'OOP is a programming paradigm',
  })
  body: string;

  @ApiProperty({
    description: 'Author of the note',
  })
  author: string;

  @ApiProperty({
    description: 'Id of the author of the note',
  })
  @IsNotEmpty()
  authorId: string;

  @ApiProperty({
    description: 'Checks if the note is pinned by the user',
  })
  isPinned: boolean;
}
