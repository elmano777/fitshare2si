import { Body, Controller, Post } from '@nestjs/common';
import { ProfileDto } from './dto/profile.dto';

@Controller('profile')
export class ProfileController {
    profileService: any;
    @Post("")
    async createProfile(@Body() dto: ProfileDto): Promise<{
        token: string;
        profile: {
            id: number;
            idusers: number;
            avatarurl: string;
            nickname: string;
        };
    }> {
        return await this.profileService.createProfile(dto);
    }
}
