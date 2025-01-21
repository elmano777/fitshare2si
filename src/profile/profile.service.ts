import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from 'src/db/db.module';
import { DrizzleInstance } from 'src/db/types/drizzle.types';
import * as schema from 'src/db/schema';
import { ProfileDto, ProfileResponseDto } from './dto/profile.dto';
import { JwtService } from '@nestjs/jwt';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProfileService {
  private readonly s3Client: S3Client;
  private readonly AWS_S3_BUCKET: string;

  constructor(
    @Inject(DRIZZLE) private readonly db: DrizzleInstance,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.AWS_S3_BUCKET = this.configService.get<string>('AWS_S3_BUCKET');
    this.s3Client = new S3Client({
      region: 'us-east-2',
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS'),
        secretAccessKey: this.configService.get<string>('AWS_SECRET'),
      },
    });
  }

  async createProfile(
    dto: ProfileDto,
    file: Express.Multer.File,
  ): Promise<ProfileResponseDto> {
    const existingProfile = await this.db.query.profile.findFirst({
      where: eq(schema.profile.idusers, dto.idUsers),
    });

    if (existingProfile) {
      throw new Error('El perfil ya existe para este usuario');
    }

    let avatarUrl = '';
    if (file) {
      const uploadResult = await this.uploadFile(file);
      avatarUrl = `https://${this.AWS_S3_BUCKET}.s3.us-east-2.amazonaws.com/${uploadResult.Key}`;
    }

    const newProfile = await this.db
      .insert(schema.profile)
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
    const fileExt = file.originalname.split('.').pop();
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}gaaaaa`;

    return await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      uniqueName,
      file.mimetype,
    );
  }

  async s3_upload(
    file: Buffer,
    bucket: string,
    name: string,
    mimetype: string,
  ) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ContentType: mimetype,
      ContentDisposition: 'inline',
    };

    try {
      const command = new PutObjectCommand(params);
      await this.s3Client.send(command);

      return {
        Key: params.Key,
        Bucket: params.Bucket,
      };
    } catch (e) {
      console.error('Error al subir a S3:', e);
      throw new Error('Error al subir el archivo a S3');
    }
  }
}
