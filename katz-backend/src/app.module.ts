import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { TypeOrmModule } from "@nestjs/typeorm";
import { Katz } from "./katz/entities/katz.entity";
import { KatzService } from "./katz/service/katz.service";
import { KatzController } from "./katz/controller/katz.controller";
import { AuthGuard } from "./auth/guard/auth.guard";
import { AuthService } from "./auth/service/auth.service";
import { UserModule } from "./user/user.module";
import { CreateGoogleAuthGuard } from "./auth/guard/create-google-auth.guard";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "admin",
      password: "ICELAND",
      database: "admin",
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Katz]),
    UserModule,
    AuthModule,
  ],
  controllers: [KatzController],
  providers: [KatzService, AuthGuard, CreateGoogleAuthGuard],
  exports: [AuthGuard, CreateGoogleAuthGuard],
})
export class AppModule {}
