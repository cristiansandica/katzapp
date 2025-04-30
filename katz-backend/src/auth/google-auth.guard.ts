import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { GoogleAuthService } from './google-auth.service';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class GoogleAuthGuard implements CanActivate {
  constructor(private readonly googleAuthService: GoogleAuthService, readonly userService: UserService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.replace('Bearer ', '');

    const user = await this.googleAuthService.verifyToken(token);
    const savedUser = await this.userService.findBy(user);

    if (!savedUser)
      throw new UnauthorizedException('Invalid token')

    // Optionally attach user to request
    request['user'] = user;

    return true;
  }
}