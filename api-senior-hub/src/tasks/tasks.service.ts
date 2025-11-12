import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { KitsuApiService } from '../external/services/kitsu-api.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly kitsuApiService: KitsuApiService) {}

  @Cron(CronExpression.EVERY_WEEK)
  async handleDailyAnimeUpdate(): Promise<void> {
    this.logger.log('Iniciando atualização semanal de animes...');
    try {
      await this.kitsuApiService.getAnimes(10, 0);
      this.logger.log('Atualização semanal concluída com sucesso.');
    } catch (error) {
      this.logger.error('Erro ao atualizar animes:', error);
    }
  }
}
