import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ExternalModule } from './external/external.module';
import { TasksModule } from './tasks/tasks.module';
import { AnimeModule } from './anime/anime.module';
import { UserAnimeModule } from './user-anime/user-anime.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    //---<POSTGRES>---

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('PG_HOST'),
        port: configService.get<number>('PG_PORT'),
        username: configService.get<string>('PG_USER'),
        password: configService.get<string>('PG_PASSWORD'),
        database: configService.get<string>('PG_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
      }),
    }),

    //---<MONGO>---

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),

    UserModule,
    AuthModule,
    ExternalModule,
    TasksModule,
    AnimeModule,
    UserAnimeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
