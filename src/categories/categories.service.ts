import { Injectable } from '@nestjs/common';
import { LogService } from '../log/log.service';
import { CategoryInterface } from './interfaces/category.interface';
import { Category, CategoryDocument, CategorySchemaName } from './categories.schema';
import { FilterQuery, Model, QueryOptions, UpdateQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly logger: LogService,
    @InjectModel(CategorySchemaName)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {
    this.logger.setContext(CategoriesService.name);
  }

  create(category: CategoryInterface): Promise<CategoryDocument>{
    this.logger.info('Save Category');
    this.logger.debug(category, 'category data');
    return new this.categoryModel(category).save()
  };

  find(
    filters: FilterQuery<Category>,
    projection?: any | null,
    options?: QueryOptions | null,
  ): Promise<CategoryDocument[]> {
    this.logger.info('Find categories...');
    this.logger.debug('Filters', filters);
    this.logger.debug('Projection', projection);

    return this.categoryModel.find().select(filters).exec();
  }

  findOne(
    filters: FilterQuery<Category>,
    projection?: any | null,
    options?: QueryOptions | null,
  ): Promise<CategoryDocument> {
    this.logger.info('Find one category...');
    this.logger.debug('Filters', filters);
    this.logger.debug('Projection', projection);

    return this.categoryModel.findOne(filters, projection, options).exec();
  }

  deleteOne(filters: FilterQuery<Category>, options?: QueryOptions): Promise<any> {
    this.logger.info('Delete cast...');
    this.logger.debug('Filters', filters);
    this.logger.debug('Options', options);

    return this.categoryModel.deleteOne(filters, options).exec();
  }

  findOneAndUpdate(
    filters: FilterQuery<Category>,
    update: UpdateQuery<Category>,
    options?: QueryOptions | null,
  ): Promise<any> {
    this.logger.info('Find one category and update...');  
    this.logger.debug('Filters', filters);
    this.logger.debug('UpdateQuery', update);

    return this.categoryModel.findOneAndUpdate(filters, update, options).exec();
  }
}
