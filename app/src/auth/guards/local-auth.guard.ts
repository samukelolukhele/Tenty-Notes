import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(err, user, info, context, status) {
    if (err || !user)
      throw new HttpException(
        'The email and password combination are incorrect.',
        HttpStatus.UNAUTHORIZED,
      );
    return user;
  }
}
