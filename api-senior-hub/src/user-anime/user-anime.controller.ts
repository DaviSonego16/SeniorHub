import {
  Controller,
  Body,
  Param,
  Delete,
  UseGuards,
  Get,
  Post,
  Request,
} from '@nestjs/common';
import { UserAnimeService } from './user-anime.service';
import { UpdateUserAnimeDto } from './dto/update-user-anime.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('user-anime')
export class UserAnimeController {
  constructor(private readonly userAnimeService: UserAnimeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  actOnUserAnime(@Request() req, @Body() dto: UpdateUserAnimeDto) {
    return this.userAnimeService.asyncUpdateAnimeUser(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  get(@Request() req) {
    return this.userAnimeService.listUserAnimes(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('id')
  getOne(@Param('id') id: string) {
    return this.userAnimeService.getUserAnimeById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userAnimeService.remove(id);
  }
}
