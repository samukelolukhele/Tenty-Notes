import { ApiProperty } from '@nestjs/swagger';
import { isEmail, Length } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  username: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john@doe.com',
  })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'Password123',
  })
  @Length(8)
  password: string;
}
