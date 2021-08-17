import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, UserSchemaName } from './users.schema';
import { LogModule } from '../log/log.module';

@Module({
  imports: [LogModule, MongooseModule.forFeature([{ name: UserSchemaName, schema: UserSchema }])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {
}
