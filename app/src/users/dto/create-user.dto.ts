import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreatUserDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'Password123',
  })
  @IsNotEmpty()
  @Length(8)
  password: string;

  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  full_name: string;

  @ApiProperty({
    description: 'Users profile description',
    example: 'This is a user profile',
  })
  description: string;

  @ApiProperty({
    description: 'Profile image of the user',
    example: 'randomimage.jpg',
  })
  profile_image: string;
}
