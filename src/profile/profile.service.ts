import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from 'src/db/db.module';
import { DrizzleInstance } from 'src/db/types/drizzle.types';
import * as schema from 'src/db/schema';
import { ProfileDto, ProfileResponseDto } from './dto/profile.dto';
import { JwtService } from '@nestjs/jwt';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProfileService {
    constructor(@Inject(DRIZZLE) private readonly db: DrizzleInstance, private readonly jwtService: JwtService, private readonly configservice: ConfigService) { }

    AWS_S3_BUCKET = this.configservice.get<string>('AWS_S3_BUCKET');
    s3 = new AWS.S3({
        accessKeyId: this.configservice.get<string>("AWS_ACCESS"),
        secretAccessKey: this.configservice.get<string>("AWS_SECRET"),
    });

    async createProfile(dto: ProfileDto, file: Express.Multer.File): Promise<ProfileResponseDto> {
        const existingProfile = await this.db.query.profile.findFirst({
            where: eq(schema.profile.idusers, dto.idUsers),
        });

        if (existingProfile) {
            throw new Error('El perfil ya existe para este usuario');
        }

        let avatarUrl = '';
        if (file) {
            const uploadResult = await this.uploadFile(file);
            avatarUrl = uploadResult.Location;
        }

        const newProfile = await this.db.insert(schema.profile)
            .values({
                idusers: dto.idUsers,
                avatarurl: avatarUrl,
                nickname: dto.nickname,
            })
            .returning();

        const token = await this.jwtService.signAsync({
            sub: newProfile[0].id,
            nickname: dto.nickname,
        });

        return {
            token,
            profile: {
                id: newProfile[0].id,
                idusers: dto.idUsers,
                avatarUrl,
                nickname: dto.nickname,
            },
        };
    }

    async uploadFile(file: Express.Multer.File) {
        console.log(file);
        const { originalname } = file;

        return await this.s3_upload(
            file.buffer,
            this.AWS_S3_BUCKET,
            originalname,
            file.mimetype,
        );
    }

    async s3_upload(file, bucket, name, mimetype) {
        const params = {
            Bucket: bucket,
            Key: String(name),
            Body: file,
            ACL: 'public-read',
            ContentType: mimetype,
            ContentDisposition: 'inline',
            CreateBucketConfiguration: {
                LocationConstraint: 'ap-south-1',
            },
        };

        try {
            const s3Response = await this.s3.upload(params).promise();
            return s3Response;
        } catch (e) {
            console.error('Error al subir a S3:', e);
            throw new Error('Error al subir el archivo a S3');
        }
    }
}
