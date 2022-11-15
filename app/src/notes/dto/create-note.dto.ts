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
    description: 'Id of the author of the note',
  })
  @IsNotEmpty()
  authorId: number;

  @ApiProperty({
    description: 'Checks if the note is pinned by the user',
  })
  is_pinned?: boolean;

  @ApiProperty({
    description: 'Date the note was created',
    example: '2022/22/12',
  })
  created_at?: string;

  @ApiProperty({
    description: 'Date the note was last updated',
    example: '2022/22/12',
  })
  updated_at?: string;
}
