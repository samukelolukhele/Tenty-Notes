import { ApiProperty } from '@nestjs/swagger';

export class UpdateNoteDto {
  @ApiProperty({
    description: 'Title of the note',
    example: 'Fundamentals of OOP',
  })
  title: string;

  @ApiProperty({
    description: 'Contents of the note',
    example: 'OOP is a programming paradigm',
  })
  body: string;

  @ApiProperty({
    description: 'Checks if the note is pinned by user',
  })
  is_pinned: boolean;
}
