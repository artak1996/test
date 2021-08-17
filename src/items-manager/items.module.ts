import { Module } from '@nestjs/common';
import { ItemsManagerService } from './items-manager.service';
import { ItemsController } from './items.controller';
import { LogModule } from '../log/log.module';
import { ItemsModule } from '../items/items.module';
// import { CategoriesService } from '../categories/categories.service';

@Module({
  imports: [LogModule, ItemsModule],
  providers: [ItemsManagerService],
  controllers: [ItemsController],


})
export class ItemsManagerModule {
}
