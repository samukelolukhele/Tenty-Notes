import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'User email',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'User password',
  })
  @IsNotEmpty()
  @Length(8)
  password: string;
}
