import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google.guard';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './types/login.dto';
import { SignUpDto } from './types/signup.dto';
import { AuthMethod } from './constants';
import { GoogleUser } from './types/google-user';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleGoogleLogin() {}

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleGoogleRedirect(@Req() request: Request) {
    const { email, name, providerId } = request.user as GoogleUser;

    return this.authService.signUp(
      { email, name, password: providerId },
      AuthMethod.OAUTH,
    );
  }

  @Post('login')
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }

  @Post('signUp')
  signUp(@Body() { name, email, password }: SignUpDto) {
    return this.authService.signUp(
      { name, email, password },
      AuthMethod.CLASSIC,
    );
  }
}
