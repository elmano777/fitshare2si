import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from 'src/db/db.module';
import { DrizzleInstance } from 'src/db/types/drizzle.types';
import * as schema from 'src/db/schema';
import { ProfileDto, ProfileResponseDto } from './dto/profile.dto';
import { JwtService } from '@nestjs/jwt';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

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
      region: 'us-east-1',
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
    console.log('Buscando usuario con ID:', dto.idUsers);

    const user = await this.db.query.users.findFirst({
      where: eq(schema.users.id, dto.idUsers),
      columns: {
        id: true,
        name: true,
        email: true,
      },
    });

    console.log('Resultado de la búsqueda:', user);

    if (!user) {
      throw new Error('El usuario no existe');
    }

    let avatarUrl = '';
    if (file) {
      const uploadResult = await this.uploadFile(file);
      avatarUrl = `https://${this.AWS_S3_BUCKET}.s3.us-east-1.amazonaws.com/${uploadResult.Key}`;
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
      id: newProfile[0].id,
      idusers: dto.idUsers,
      avatarUrl,
    });

    return {
      token,
    };
  }

  async uploadFile(file: Express.Multer.File) {
    const fileExt = file.originalname.split('.').pop();
    const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    if (!fileExt || !validExtensions.includes(fileExt.toLowerCase())) {
      throw new Error('Tipo de archivo no permitido');
    }

    const datePrefix = new Date().toISOString().split('T')[0];
    const uniqueName = `${datePrefix}/${uuidv4()}.${fileExt}`;

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
