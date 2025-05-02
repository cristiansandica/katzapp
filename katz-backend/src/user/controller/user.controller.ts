import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { User } from "../entities/user.entity";
import { AuthGuard } from "src/auth/guard/auth.guard";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(":email")
  findOne(@Param("email") email: string) {
    return this.userService.findBy({ email } as User);
  }
}
