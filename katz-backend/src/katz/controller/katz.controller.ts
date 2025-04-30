import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from 'src/auth/google-auth.guard';
import { CreateKatzDto } from 'src/katz/dto/create-katz.dto';
import { KatzService } from 'src/katz/service/katz.service';

@Controller('katz')
export class KatzController {
    constructor(private readonly katzService: KatzService) { }

    @UseGuards(GoogleAuthGuard)
    @Post('/create')
    createKatz(@Body() createKatzDto: CreateKatzDto, @Req() req) {
        return this.katzService.create({
            ...createKatzDto
        });
    }

    @UseGuards(GoogleAuthGuard)
    @Get("/user")
    getMyKatz(@Req() req) {
        console.log('REQUEST USER:', req.user);
        return this.katzService.findAllByUser(req.user.uid);
    }

    @UseGuards(GoogleAuthGuard)
    @Get()
    async getKatz() {
        return await this.katzService.findAll();
    }
}