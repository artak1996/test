import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import chalk from 'chalk';
import pino, { Logger } from 'pino';

@Injectable({ scope: Scope.TRANSIENT })
export class LogService {
  private logger: Logger;

  constructor(private readonly configService: ConfigService) {
    this.logger = pino(this.configService.get('LOGGER_CONFIG')).child({
      pinoLoggerContext: '[System]',
    });
  }

  private log(level: string, ...rest: any[]): void {
    return this.logger[level](rest[0], ...rest.slice(1));
  }

  setContext(pinoLoggerContext) {
    this.logger = this.logger.child({
      // pinoLoggerContext: chalk.green(`[${pinoLoggerContext}]:`),
    });
  }

  debug(...args: any): void {
    return this.log('debug', ...args);
  }

  info(...args: any): void {
    return this.log('info', ...args);
  }

  error(...args: any): void {
    return this.log('error', ...args);
  }
}
