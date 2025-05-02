import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "../service/auth.service";

@Injectable()
export class CreateGoogleAuthGuard implements CanActivate {
  constructor(private readonly googleAuthService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const authHeader = request.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("No token provided");
    }

    const token = authHeader.replace("Bearer ", "");

    const user = await this.googleAuthService.verifyGoogleToken(token);

    // Optionally attach user to request
    request["user"] = user;

    return true;
  }
}
