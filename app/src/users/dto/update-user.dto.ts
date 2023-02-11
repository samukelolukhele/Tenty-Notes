import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'john_doe',
  })
  username?: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john@doe.com',
  })
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'Password123',
  })
  @Length(8)
  password?: string;

  @ApiProperty({ description: 'Full name of the user', example: 'John Doe' })
  full_name?: string;

  @ApiProperty({
    description: 'User profile image',
    example: 'randomimage.jpg',
  })
  profile_image?: string;
}
