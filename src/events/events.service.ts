import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EventsService {
  constructor(
    private configService: ConfigService,
    @Inject('TRANSPORTER') private transporter: nodemailer.Transporter,
  ) {}

  async sendMail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: this.configService.get('MAIL_USER'),
      to: to,
      subject: subject,
      text: text,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Correo enviado con éxito');
    } catch (error) {
      console.error('Error al enviar correo:', error);
    }
  }
}
