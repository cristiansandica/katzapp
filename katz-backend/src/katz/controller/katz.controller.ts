import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/guard/auth.guard";
import { CreateKatzDto } from "src/katz/dto/create-katz.dto";
import { KatzService } from "src/katz/service/katz.service";

@Controller("katz")
export class KatzController {
  constructor(private readonly katzService: KatzService) {}

  @UseGuards(AuthGuard)
  @Post("/create")
  createKatz(@Body() createKatzDto: CreateKatzDto, @Req() req) {
    const createKatz = {
      ...createKatzDto,
      userId: req.user.uid
    }
    return this.katzService.create({
      ...createKatz
    });
  }

  @UseGuards(AuthGuard)
  @Get("/user")
  getMyKatz(@Req() req) {
    console.log("REQUEST USER:", req.user);
    return this.katzService.findAllByUser(req.user.uid);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getKatz() {
    return await this.katzService.findAll();
  }
}
