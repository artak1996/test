import { Module } from '@nestjs/common';
import { CategoriesModule } from '../categories/categories.module';
import { LogModule } from '../log/log.module';
import { CategoriesManagerService } from './categories.service';
import { CategoriesController } from './categories.controller';

@Module({
  imports:[CategoriesModule,LogModule],
  providers:[CategoriesManagerService],
  controllers:[CategoriesController]
})

export class CategoryManagerModule{}