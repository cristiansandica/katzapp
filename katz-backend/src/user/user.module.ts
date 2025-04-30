import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { GoogleAuthGuard } from 'src/auth/google-auth.guard';
import { GoogleAuthService } from 'src/auth/google-auth.service';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, GoogleAuthGuard, GoogleAuthService],
  exports:[UserService]
})
export class UserModule {}
