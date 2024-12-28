import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from 'src/db/db.module';
import { DrizzleInstance } from 'src/db/types/drizzle.types';
import * as schema from 'src/db/schema';
import { ProfileDto } from './dto/profile.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ProfileService {
    constructor(@Inject(DRIZZLE) private readonly db: DrizzleInstance, private readonly jwtService: JwtService) { }

    async createProfile(dto: ProfileDto) {
        const existingProfile = await this.db.query.profile.findFirst({
            where: eq(schema.profile.idusers, dto.idUsers),
        });

        if (existingProfile) {
            throw new Error('El perfil ya existe para este usuario');
        }

        const newProfile = await this.db.insert(schema.profile)
            .values({
                idusers: dto.idUsers,
                avatarurl: dto.avatarUrl || "",
                nickname: dto.nickname,
            })
            .returning();


        const token = await this.jwtService.signAsync({
            sub: newProfile[0].id,
            nickname: dto.nickname,
        });

        return { token, profile: newProfile[0] };
    }

}
