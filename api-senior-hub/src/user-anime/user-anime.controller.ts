import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserAnimeService } from './user-anime.service';
import { CreateUserAnimeDto } from './dto/create-user-anime.dto';
import { UpdateUserAnimeDto } from './dto/update-user-anime.dto';

@Controller('user-anime')
export class UserAnimeController {
  constructor(private readonly userAnimeService: UserAnimeService) {}

  @Post()
  create(@Body() dto: CreateUserAnimeDto) {
    return this.userAnimeService.addAnimeToUser(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserAnimeDto) {
    return this.userAnimeService.asyncUpdateAnimeUser(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userAnimeService.remove(id);
  }
}
