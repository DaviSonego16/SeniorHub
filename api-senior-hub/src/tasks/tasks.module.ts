import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks.service';
import { ExternalModule } from '../external/external.module';
import { AnimeModule } from 'src/anime/anime.module';
import { Anime, AnimeSchema } from 'src/anime/entities/anime.schema';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ExternalModule,
    AnimeModule,
    MongooseModule.forFeature([{ name: Anime.name, schema: AnimeSchema }]),
  ],
  providers: [TasksService],
})
export class TasksModule {}
