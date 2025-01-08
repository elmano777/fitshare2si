import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DbModule } from '../db/db.module';
import { AuthController } from './auth.controller';
import { ProfileModule } from 'src/profile/profile.module';
import { EventsModule } from 'src/events/events.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    DbModule,
    ProfileModule,
    EventsModule,
    PassportModule.register({ defaultStrategy: 'google' }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
