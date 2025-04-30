import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Katz } from './katz/entities/katz.entity';
import { KatzService } from './katz/service/katz.service';
import { KatzController } from './katz/controller/katz.controller';
import { GoogleAuthGuard } from './auth/google-auth.guard';
import { GoogleAuthService } from './auth/google-auth.service';
import { UserModule } from './user/user.module';
import { CreateGoogleAuthGuard } from './auth/create-google-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'katz_user',
      password: 'katz_pass',
      database: 'katz_db',
      autoLoadEntities: true,
      synchronize: true, // disable this in production
    }),
    TypeOrmModule.forFeature([Katz]),
    UserModule,
  ],
  controllers: [KatzController],
  providers: [KatzService, GoogleAuthService, GoogleAuthGuard, CreateGoogleAuthGuard],
  exports: [GoogleAuthGuard, CreateGoogleAuthGuard],
})
export class AppModule {}
