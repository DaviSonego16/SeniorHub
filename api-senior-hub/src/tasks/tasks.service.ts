import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { KitsuApiService } from '../external/services/kitsu-api.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly kitsuApiService: KitsuApiService) {}

  // Executa todos os dias à meia-noite
  @Cron(CronExpression.EVERY_WEEK)
  async handleDailyAnimeUpdate(): Promise<void> {
    this.logger.log('Iniciando atualização diária de animes...');
    try {
      await this.kitsuApiService.getAnimes(10, 0);
      this.logger.log('Atualização diária concluída com sucesso.');
    } catch (error) {
      this.logger.error('Erro ao atualizar animes:', error);
    }
  }
}
