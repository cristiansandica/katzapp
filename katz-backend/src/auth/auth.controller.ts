import { Body, Controller, Post, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "./service/auth.service";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { CreateGoogleAuthGuard } from "./guard/create-google-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(CreateGoogleAuthGuard)
  @Post("signup/google")
  async googleSignUp(@Request() request: Request) {
    const user = request["user"];
    const createdUser = await this.authService.signUpGoogleUser(user);
    console.log("Returning createdUser:", createdUser);
    return createdUser || {};
  }

  @Post("signup")
  async signUp(@Body() user: CreateUserDto) {
    return await this.authService.signUpUser(user);
  }

  @Post("login")
  async logIn(@Body() user: CreateUserDto) {
    const res = await this.authService.login(user);
    console.log("Intra credentiaLogin: ", res)
    return res;
  }
}
