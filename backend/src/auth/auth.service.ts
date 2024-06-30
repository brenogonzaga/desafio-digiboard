import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SingupDTO } from '../dtos/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { Payload, Token } from './interface';
import { UserService } from '../user/user.service';
import { LoginDTO } from '../dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async login({ email, password }: LoginDTO): Promise<Token> {
    const findUser = await this.userService.findOneByEmailActive(email);

    if (!findUser) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    const isPasswordMatch = await bcrypt.compare(password, findUser.password);

    if (!isPasswordMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    const payload = { sub: findUser.id, name: findUser.name };

    const access_token = await this.jwtService.signAsync(payload);

    return { access_token, type: 'bearer', name: findUser.name };
  }

  async signup({ email, name, password }: SingupDTO): Promise<void> {
    const findUSer = await this.userService.findOneByEmail(email);

    if (findUSer) {
      throw new HttpException(
        `User with e-mail ${email} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.userService.create({
      email,
      name,
      password: hashedPassword,
    });
  }

  async validateUser(payload: Payload) {
    return this.userService.findOneByIdActive(payload.sub);
  }

  async refresh(refreshToken: string): Promise<Token> {
    const payload = this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET,
    });

    const user = await this.userService.findOneByIdActive(payload.sub);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const access_token = await this.jwtService.signAsync(payload);

    return { access_token, type: 'bearer', name: user.name };
  }
}
