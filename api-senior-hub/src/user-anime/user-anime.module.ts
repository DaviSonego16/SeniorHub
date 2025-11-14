import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAnime } from './entities/user-anime.entity';
import { User } from '../user/entities/user.entity';
import { Anime } from '../anime/entities/anime.schema';
import { UserAnimeService } from './user-anime.service';
import { UserAnimeController } from './user-anime.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserAnime, User, Anime])],
  providers: [UserAnimeService],
  controllers: [UserAnimeController],
  exports: [UserAnimeService],
})
export class UserAnimeModule {}
