import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { GoogleDto } from './dto/google.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(201)
  @SetMetadata('no-auth', true)
  register(@Body() dto: RegisterDto): Promise<{
    userId: number;
  }> {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(200)
  @SetMetadata('no-auth', true)
  login(@Body() dto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(dto);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @SetMetadata('no-auth', true)
  googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @SetMetadata('no-auth', true)
  async googleAuthRedirect(
    @Req() req: Request & { user: GoogleDto },
  ): Promise<{ token: string }> {
    return this.authService.googleLogin(req.user);
  }
}
