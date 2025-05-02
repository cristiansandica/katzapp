import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthGuard } from "src/auth/guard/auth.guard";
import { AuthService } from "src/auth/service/auth.service";
import { KatzController } from "./controller/katz.controller";
import { KatzService } from "./service/katz.service";
import { Katz } from "./entities/katz.entity";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([Katz])],
  controllers: [KatzController],
  providers: [KatzService, AuthGuard, AuthService, JwtService],
  exports: [KatzService],
})
export class UserModule {}
