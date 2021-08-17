import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LogService } from './log.service';
import loggerConfig from '../config/logger.config';

@Module({
  imports: [ConfigModule.forFeature(loggerConfig)],
  providers: [LogService],
  exports: [LogService],
})
export class LogModule {}
