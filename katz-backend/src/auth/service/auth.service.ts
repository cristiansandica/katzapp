import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { OAuth2Client } from "google-auth-library";
import { User } from "src/user/entities/user.entity";
import UserPayload from "src/models/UserPayload";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UserService } from "src/user/service/user.service";
import { v4 as uuidv4 } from "uuid";
import { compare, genSalt, hash } from "bcrypt";
import { CreatedUserDto } from "src/user/dto/created-user.dto";

const client = new OAuth2Client();

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  async verifyGoogleToken(idToken: string): Promise<User> {
    try {
      const ticket = await client.verifyIdToken({
        idToken,
      });
      const payload = ticket.getPayload();

      if (!payload || !payload.sub || !payload.email) {
        throw new UnauthorizedException("Invalid token payload");
      }

      const uid = payload.sub;
      const email = payload.email;

      return { uid, email } as User;
    } catch (error) {
      throw new UnauthorizedException("Invalid token");
    }
  }

  verifyUserToken(token: string): User {
    try {
      const user = this.jwtService.verify<UserPayload>(token);
      return { uid: user.uid, email: user.email } as User;
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }

  async login(user: CreateUserDto) {
    const existingUser = await this.userService.findBy({
      email: user.email,
    } as User);

    if (!existingUser) throw new NotFoundException("User not found");

    const isCorrect = await compare(user.password, existingUser.password);

    if (!isCorrect) throw new BadRequestException("Error while logging user");

    const payload = {
      uid: existingUser.uid,
      email: existingUser.email,
    } as UserPayload;

    let token: string | undefined;

    try {
      token = this.jwtService.sign(payload);
    } catch (err) {
      console.log(err);
    }

    return {
      access_token: token,
    };
  }

  async signUpUser(user: CreateUserDto) {
    const existingUser = await this.userService.findBy({
      email: user.email,
    } as User);

    if (existingUser)
      throw new BadRequestException("Erorr while creating the user.");

    const salt = await genSalt(10);

    const hashedPass = await hash(user.password, salt);

    const newUser = await this.userService.createUser({
      ...user,
      uid: uuidv4(),
      password: hashedPass,
    } as User);

    const createdUser = {
      uid: newUser.uid,
      email: newUser.email,
      isGoogleAccount: newUser.isGoogleAccount,
    } as CreatedUserDto;

    return createdUser;
  }

  async signUpGoogleUser(user: User) {
    user.isGoogleAccount = true;

    const existingUser = await this.userService.findBy({
      email: user.email,
    } as User);

    if (existingUser)
      throw new BadRequestException("Erorr while creating the user.");

    return await this.userService.createUser(user);
  }
}
