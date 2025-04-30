import { Controller, Get, Post, Param, UseGuards, Request } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../entities/user.entity';
import { GoogleAuthGuard } from 'src/auth/google-auth.guard';
import { CreateGoogleAuthGuard } from 'src/auth/create-google-auth.guard';
import { GoogleAuthService } from 'src/auth/google-auth.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly googleService: GoogleAuthService) { }

  @UseGuards(GoogleAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(GoogleAuthGuard)
  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.userService.findBy({ email } as User);
  }

  @UseGuards(CreateGoogleAuthGuard)
  @Post()
  async create(@Request() request: Request) {
    const user = request['user'];
    const createdUser = await this.userService.createUser(user);
    console.log('Returning createdUser:', createdUser);
    return createdUser || {};
  }
}
