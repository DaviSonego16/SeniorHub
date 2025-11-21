import { Controller, Get, Query, Param, UseGuards } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findWithFilter(
    @Query('title') title?: string,
    @Query('subtype') subtype?: string,
    @Query('status') status?: string,
  ) {
    return this.animeService.findWithFilter({ title, subtype, status });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.animeService.findById(id);
  }
}
