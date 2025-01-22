import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}
  use(req: any, res: any, next: () => void) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token) {
      try {
        const jwtSecret = this.configService.get<string>('JWT_SECRET');
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
      } catch (err) {
        console.error('Invalid token:', err.message);
      }
    }
    next();
  }
}
