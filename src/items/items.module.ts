import { Module } from '@nestjs/common';
import { LogModule } from '../log/log.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemSchema, ItemSchemaName } from './items.schema';
import { ItemsService } from './items.service';

@Module({
  imports: [
    LogModule,
    MongooseModule.forFeature([{ name: ItemSchemaName, schema: ItemSchema }]),
  ],
  providers: [ItemsService],
  exports: [ItemsService],
})
export class ItemsModule {}
