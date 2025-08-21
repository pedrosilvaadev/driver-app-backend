// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDriverDto } from './dto/register-driver.dto';
import { SignInDriverDto } from './dto/signin-driver.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  async signup(@Body() dto: RegisterDriverDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  async signin(@Body() dto: SignInDriverDto) {
    return this.authService.signin(dto);
  }
}
