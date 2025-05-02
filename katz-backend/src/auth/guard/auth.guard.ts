import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "../service/auth.service";
import { UserService } from "src/user/service/user.service";
import { User } from "src/user/entities/user.entity";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly googleAuthService: AuthService,
    readonly userService: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const authHeader = request.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("No token provided");
    }

    const token = authHeader.replace("Bearer ", "");

    let existingUser: User;

    try {
      const googleUser = await this.googleAuthService.verifyGoogleToken(token);
      existingUser = googleUser;
    } catch {
      console.log("Google token is not valid: ", token);
    }

    const localUser = await this.googleAuthService.verifyUserToken(token);
    existingUser = localUser;

    if (existingUser == null) throw new UnauthorizedException("Invalid Token");

    const savedUser = await this.userService.findBy(existingUser);

    if (!savedUser) throw new UnauthorizedException("Invalid token");

    // Optionally attach user to request
    request["user"] = existingUser;

    return true;
  }
}
