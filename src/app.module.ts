import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import mongoConfig from './config/mongo.config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LogModule } from './log/log.module';
import { PrivateTokenModule } from './private-token/private-token.module';
import { UsersManagerModule } from './users-manager/users-manager.module';
import { CategoriesModule } from './categories/categories.module';
import { ItemsModule } from './items/items.module';
import validate from './config/validate';
import { CategoryManagerModule } from './categories-manager/category-manager.module';
import { ItemsManagerModule } from './items-manager/items.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forFeature(mongoConfig)],
      useFactory: async (config: ConfigService) => ({
        uri: config.get('mongo.uri'),
        ...config.get('mongo.connectionOptions'),
      }),
      inject: [ConfigService],
    }),

    AuthModule, UsersModule, LogModule, PrivateTokenModule, UsersManagerModule, CategoriesModule, ItemsModule,ItemsManagerModule,CategoryManagerModule],
})
export class AppModule {
}
