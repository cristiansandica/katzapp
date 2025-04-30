import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { User } from 'src/user/entities/user.entity';
import { DataSource } from 'typeorm';

const client = new OAuth2Client(); // Optional: You can pass your CLIENT_ID here

@Injectable()
export class GoogleAuthService {
  constructor(private dataSource: DataSource) {}

  async verifyToken(idToken: string): Promise<User> {
    try {
      const ticket = await client.verifyIdToken({
        idToken,
      });
      const payload = ticket.getPayload();

      if (!payload || !payload.sub || !payload.email) {
        throw new UnauthorizedException('Invalid token payload');
      }

      const uid = payload.sub;
      const email = payload.email;

      return { uid, email } as User;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}