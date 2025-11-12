import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks.service';
import { ExternalModule } from '../external/external.module';

@Module({
  imports: [
    ScheduleModule.forRoot(), // habilita agendamento global
    ExternalModule,
  ],
  providers: [TasksService],
})
export class TasksModule {}
