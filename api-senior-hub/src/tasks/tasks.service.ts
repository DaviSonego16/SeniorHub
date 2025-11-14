import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { KitsuApiService } from '../external/services/kitsu-api.service';
import type { KitsuAnimeItem } from '../external/interfaces/kitsu-anime-response.interface';

import { Anime } from '../anime/entities/anime.schema';
import { AnimeService } from '../anime/anime.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  private readonly limit = 20;
  private isRunning = false; // 🔒 lock

  constructor(
    private readonly kitsuApiService: KitsuApiService,
    private readonly animeService: AnimeService,

    @InjectModel(Anime.name)
    private readonly animeModel: Model<Anime>,
  ) {}

  @Cron(CronExpression.EVERY_WEEK)
  // @Cron('*/20 * * * * *') // Para testar a cada 20 segundos
  async handleWeeklyAnimeUpdate(): Promise<void> {
    if (this.isRunning) {
      this.logger.warn('Cron ignorado: execução anterior ainda em andamento.');
      return;
    }

    this.isRunning = true; // 🔒 trava execução
    this.logger.log('Iniciando atualização semanal de animes...');

    try {
      let offset = 0;
      let totalFetched = 0;

      while (true) {
        const response = await this.kitsuApiService.getAnimes(
          this.limit,
          offset,
        );

        const data: KitsuAnimeItem[] = response?.data ?? [];

        if (data.length === 0) {
          this.logger.log(
            `Fim da atualização. Total processado: ${totalFetched}`,
          );
          break;
        }

        for (const item of data) {
          await this.upsertAnime(item);
          totalFetched++;
        }

        offset += this.limit;
      }

      this.logger.log(
        `Atualização semanal concluída com sucesso. Total inserido/atualizado: ${totalFetched}`,
      );
    } catch (error) {
      this.logger.error('Erro ao atualizar animes:', error);
    }
  }

  private async upsertAnime(anime: KitsuAnimeItem): Promise<void> {
    await this.animeModel.updateOne(
      { kitsuId: anime.id },
      {
        $set: {
          kitsuId: anime.id,
          attributes: anime.attributes,
          updatedAt: new Date(),
        },
      },
      { upsert: true },
    );
  }
}
