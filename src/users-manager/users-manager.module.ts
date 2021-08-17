import { Module } from '@nestjs/common';
import { UsersManagerController } from './users-manager.controller';
import { PrivateTokenModule } from '../private-token/private-token.module';
import { LogModule } from '../log/log.module';
import { UsersModule } from '../users/users.module';
import { UsersManagerService } from './users-manager.service';

@Module({
  imports: [UsersModule, LogModule, PrivateTokenModule],
  controllers: [UsersManagerController],
  providers: [UsersManagerService],

})
export class UsersManagerModule {}
