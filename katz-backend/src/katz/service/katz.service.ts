import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateKatzDto } from 'src/katz/dto/create-katz.dto';
import { Katz } from 'src/katz/entities/katz.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/service/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class KatzService {
  constructor(
    @InjectRepository(Katz)
    private readonly katzRepo: Repository<Katz>,
    private readonly userService: UserService
  ) { }

  async create(dto: CreateKatzDto): Promise<Katz> {
    const user = await this.userService.findBy({ uid: dto.userId } as User);

    const kat = {
      name: dto.name,
      imageUrl: dto.imageUrl, user
    } as Katz

    console.log(`Creating Katz for user ${dto.userId}: ${dto.name}`);

    const katz = this.katzRepo.create(kat);
    return this.katzRepo.save(katz);
  }

  async findAllByUser(userId: string): Promise<Katz | null> {
    const katzRepo = await this.katzRepo.findOne({
      where: { userUid: userId }
    });
    console.log(katzRepo, "katzRepo");
    return katzRepo;
  }

  async findAll() {
    return await this.katzRepo.find();
  }
}