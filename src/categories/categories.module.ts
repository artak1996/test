import { Module } from '@nestjs/common';
import { LogModule } from '../log/log.module';
import { CategoriesService } from './categories.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema, CategorySchemaName } from './categories.schema';

@Module({
  imports: [
    LogModule,
    MongooseModule.forFeature([{ name: CategorySchemaName, schema: CategorySchema }]),
  ],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {
}
