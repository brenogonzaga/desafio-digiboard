import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SingupDTO } from '../dtos/signup.dto';
import { LoginDTO } from '../dtos/login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }

  @Post('signup')
  async signup(@Body() signupDTO: SingupDTO) {
    return this.authService.signup(signupDTO);
  }

  @Post('refresh')
  async refresh(@Body() refreshDTO: { refreshToken: string }) {
    return this.authService.refresh(refreshDTO.refreshToken);
  }
}
