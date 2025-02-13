import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProfileDto, ProfileResponseDto } from './dto/profile.dto';
import { ProfileService } from './profile.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('profile')
export class ProfileController {
  constructor(private readonly prfileservice: ProfileService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('avatar'))
  async createProfile(
    @Body() dto: ProfileDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ProfileResponseDto> {
    if (!file) {
      throw new BadRequestException(
        'El campo avatar es obligatorio y debe contener una imagen.',
      );
    }
    return await this.prfileservice.createProfile(dto, file);
  }
}
