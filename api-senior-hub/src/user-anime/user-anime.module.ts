import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAnime } from './entities/user-anime.entity';
import { User } from '../user/entities/user.entity';
import { UserAnimeService } from './user-anime.service';
import { UserAnimeController } from './user-anime.controller';
import { AnimeModule } from 'src/anime/anime.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAnime, User]),
    AnimeModule, // <-- adiciona aqui
  ],
  providers: [UserAnimeService],
  controllers: [UserAnimeController],
  exports: [UserAnimeService],
})
export class UserAnimeModule {}
