import { forwardRef, Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { AuthService } from "./service/auth.service";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";

@Module({
  imports: [
    JwtModule.register({
      secret: "yourHardcodedSecret",
      signOptions: { expiresIn: "1h" },
    }),
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
