import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleAuthGuard } from 'src/auth/google-auth.guard';
import { GoogleAuthService } from 'src/auth/google-auth.service';
import { KatzController } from './controller/katz.controller';
import { KatzService } from './service/katz.service';
import { Katz } from './entities/katz.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Katz])],
  controllers: [KatzController],
  providers: [KatzService, GoogleAuthGuard, GoogleAuthService],
  exports:[KatzService]
})
export class UserModule {}
