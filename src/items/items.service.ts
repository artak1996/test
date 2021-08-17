import { Injectable } from '@nestjs/common';
import { FilterQuery, Model, QueryOptions, UpdateQuery } from 'mongoose';
import { Item, ItemDocument, ItemSchemaName } from './items.schema';
import { InjectModel } from '@nestjs/mongoose';
import { LogService } from '../log/log.service';
import { ItemInterface } from './interfaces/item.interface';

@Injectable()
export class ItemsService {
  constructor(
    private readonly logger: LogService,
    @InjectModel(ItemSchemaName)
    private readonly itemModel: Model<ItemDocument>,
  ) {
    this.logger.setContext(ItemsService.name);
  }

  create(item: ItemInterface): Promise<ItemDocument> {
    this.logger.info('Save item...');
    this.logger.debug(item, 'Item data');

    return new this.itemModel(item).save();
  }

  find(
    filters: FilterQuery<Item>,
    projection?: any | null,
    options?: QueryOptions | null,
  ): Promise<ItemDocument[]> {
    this.logger.info('Find items...');
    this.logger.debug('Filters', filters);
    this.logger.debug('Projection', projection);

    return this.itemModel.find(filters, projection, options).exec();
  }

  findOneAndUpdate(
    filters: FilterQuery<Item>,
    update: UpdateQuery<Item>,
    options?: QueryOptions | null,
  ) {
    this.logger.info('Find one item and update...');
    this.logger.debug('Filters', filters);
    this.logger.debug('UpdateQuery', update);
    return this.itemModel.findOneAndUpdate(filters, update, options).exec();
  }
}
