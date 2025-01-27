import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ProfileDto {
  @IsNumber()
  idUsers: number;

  @IsString()
  nickname: string;
}

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  nickname?: string;
}

export interface ProfileResponseDto {
  token: string;
  profile: {
    id: number;
    idusers?: number;
    avatarUrl: string;
    nickname: string;
  };
}
