import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Get('users')
    async findAll() {
        return await this.authService.findAll();
    }

    @Post('register')
    @HttpCode(201)
    register(@Body() dto: RegisterDto): Promise<{ token: string; }> {
        return this.authService.register(dto);
    }

    @Post('login')
    @HttpCode(200)
    login(@Body() dto: LoginDto): Promise<{ token: string; }> {
        return this.authService.login(dto);
    }
}