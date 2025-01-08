import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { DRIZZLE } from '../db/db.module';
import { DrizzleInstance } from '../db/types/drizzle.types';
import * as schema from '../db/schema';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserCreatedEvent } from './events/user-created.event';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DRIZZLE) private readonly db: DrizzleInstance,
    private readonly jwtService: JwtService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.db.query.users.findFirst({
      where: eq(schema.users.email, dto.email),
    });

    if (existingUser) {
      throw new UnauthorizedException('El email ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(dto.password_hash, 10);

    const newUser = await this.db
      .insert(schema.users)
      .values({
        name: dto.name,
        lastNames: dto.last_names,
        email: dto.email,
        passwordHash: hashedPassword,
        birthday: new Date(dto.birthday).toISOString().split('T')[0],
        country: dto.country,
        city: dto.city,
      })
      .returning();

    const event = new UserCreatedEvent();
    event.name = newUser[0].name;
    this.eventEmitter.emit('user.created', event);

    return { userId: newUser[0].id };
  }

  async login(dto: LoginDto) {
    const user = await this.db.query.users.findFirst({
      where: eq(schema.users.email, dto.email),
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const token = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });

    return { token };
  }
}
