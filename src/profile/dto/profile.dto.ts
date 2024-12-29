export interface ProfileDto {
    idUsers: number;
    nickname: string;
}

export interface ProfileResponseDto {
    token: string;
    profile: {
        id: number;
        idusers: number;
        avatarUrl: string;
        nickname: string;
    };
}
