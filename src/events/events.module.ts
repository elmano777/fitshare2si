import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Module({
  imports: [ConfigModule],
  providers: [
    EventsService,
    {
      provide: 'TRANSPORTER',
      useFactory: async (configService: ConfigService) => {
        return nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASS'),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [EventsService],
})
export class EventsModule {}
