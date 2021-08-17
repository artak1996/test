import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LogService } from '../log/log.service';

@Catch()
export class AppExceptionsFilter implements ExceptionFilter {
  private logger: LogService;

  constructor(logger: LogService) {
    this.logger = logger;
  }

  catch(exception: Error | HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let httpErrResponse = null;
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      httpErrResponse = exception.getResponse();
    }

    const errMessage = httpErrResponse?.message || exception?.message;

    const err = {
      statusCode,
      error: httpErrResponse?.error || exception?.name,
      message: Array.isArray(errMessage) ? errMessage[0] : errMessage,
      path: request.url,
      query: request.query,
      body: request.body,
      stack: exception?.stack,
    };

    this.logger.error(err, err.message);

    response.status(statusCode).json(err);
  }
}
