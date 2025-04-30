import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findBy(user: User): Promise<User | null> {
    return this.userRepository.findOneBy({ ...user });
  }

  async createUser(data: User): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({
      uid: data.uid
    });

    if (existingUser)
      return existingUser;

    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }
}
