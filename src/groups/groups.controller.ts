import { Controller, Get } from '@nestjs/common';

@Controller('groups')
export class GroupsController {
  @Get()
  async hola() {
    return 'Hola mundo';
  }
}
