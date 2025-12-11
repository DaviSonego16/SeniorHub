import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions-filters';
import { ResponseInterceptor } from './common/interceptors/response-interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔹 Ativa a validação global com class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove campos não declarados no DTO
      forbidNonWhitelisted: true, // Lança erro se enviar campo desconhecido
      transform: true, // Converte tipos automaticamente (string -> number, etc)
    }),
  );

  const sameHostRegex = /^https?:\/\/([^:/]+)(:\d+)?$/u;
  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allowed?: boolean) => void,
    ): void => {
      // Requisições internas/Swagger (sem header origin)
      if (origin === undefined) {
        callback(null, true);
        return;
      }

      try {
        const requestUrl = new URL(origin);
        const hostname = requestUrl.hostname;

        // Aceita apenas se vier do mesmo host (qualquer porta)
        if (sameHostRegex.test(origin) && hostname === requestUrl.hostname) {
          callback(null, true);
          return;
        }

        callback(new Error('CORS: origin not allowed'));
      } catch {
        callback(new Error('CORS: invalid origin format'));
      }
    },
    credentials: true,
  });

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
