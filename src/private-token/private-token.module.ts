import { Module } from '@nestjs/common';
import { PrivateTokenService } from './private-token.service';
import { LogModule } from '../log/log.module';

@Module({
  imports: [LogModule],
  providers: [PrivateTokenService],
  exports: [PrivateTokenService],
})
export class PrivateTokenModule {}