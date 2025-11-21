import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Erro interno no servidor.';

    // 🔹 Se for um erro do Nest (como BadRequest, Conflict, etc)
    if (exception instanceof HttpException) {
      status = exception.getStatus();

      const res = exception.getResponse();
      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && (res as any).message) {
        message = (res as any).message;
      }
    }

    // 🔹 Se for um erro do banco (ex: Postgres unique violation)
    else if (
      typeof exception === 'object' &&
      exception !== null &&
      'code' in exception
    ) {
      const pgError = exception as any;
      switch (pgError.code) {
        case '23505': // unique_violation
          status = HttpStatus.CONFLICT;
          message = 'Registro duplicado. Verifique os dados.';
          break;
        case '23503': // foreign_key_violation
          status = HttpStatus.BAD_REQUEST;
          message = 'Relação inválida. Verifique as referências.';
          break;
        default:
          message = 'Erro no banco de dados.';
      }
    }

    // 🔹 Retorno padronizado
    response.status(status).json({
      sucess: false,
      statusCode: status,
      data: { message },
      timestamp: new Date().toISOString(),
    });
  }
}
