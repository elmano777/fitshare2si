import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from 'src/db/db.module';
import { DrizzleInstance } from 'src/db/types/drizzle.types';

@Injectable()
export class UsersService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleInstance) {}

  async getUsers() {
    return await this.db.query.users.findMany();
  }

  async getUserById(id: number) {
    return await this.db.query.users.findFirst({
      where: (users) => eq(users.id, id),
    });
  }

  async getUsersByCity(cityName: string) {
    return await this.db.query.users.findMany({
      where: (users) => eq(users.city, cityName),
    });
  }
}
