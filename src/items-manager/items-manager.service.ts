import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { LogService } from '../log/log.service';
import { ItemsService } from '../items/items.service';
import { NewItemRequestDTO } from './dto/new-item-request.dto';
import { NewItemResponseDTO } from './dto/new-item-response.dto';
import { ItemNotFoundError, UnableToSaveItemError } from '../common/error';
import { ItemsListRequestDTO } from './dto/items-list-request.dto';
import { ItemsListResponseDTO } from './dto/items-list-response.dto';
import { Types } from 'mongoose';
import _ from 'lodash';

import { UpdateItemRequestDTO } from './dto/update-item-request.dto';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ItemsManagerService {
  constructor(
    // @Inject(forwardRef(() => LogService))
    private readonly logger: LogService,
    private readonly itemService: ItemsService,
    // private readonly categoryService: CategoriesService,
  ) {
    this.logger.setContext(ItemsManagerService.name);
  }

  async create(newItem: NewItemRequestDTO): Promise<NewItemResponseDTO> {
    try {
      const item = await this.itemService.create(newItem);
      return item;
    } catch (error) {
      this.logger.error('Can\'t save item', error);
      throw new UnableToSaveItemError();
    }
  }

  async list(opts: ItemsListRequestDTO): Promise<ItemsListResponseDTO> {
    const searchFilter: any = {};
    if (opts.search) {
      searchFilter.name =
        {
          $regex: opts.search,
          $options: 'i',
        };
    }

    try {
      const items = await this.itemService.find(
        searchFilter,
        opts?.fields,
        {
          limit: Number(opts?.limit) || 50,
          skip: Number(opts?.offset) || 0,
          sort: opts?.sort && JSON.parse(opts.sort),
        });

      return {
        data: items,
        offset: opts?.offset,
        count: items.length,
      };
    } catch (err) {

    }
  }

  async update(
    itemId: Types.ObjectId,
    categoryId: Types.ObjectId,
    updatedItem: UpdateItemRequestDTO,
  ): Promise<NewItemResponseDTO> {

    const props = {
      name: updatedItem?.name,
      price: updatedItem?.price,
      categoryId: updatedItem?.categoryId,
      image: updatedItem?.image,
      available: updatedItem?.available,
    };

    try {
      const item = await this.itemService.findOneAndUpdate(
        {
          itemId,
          _id: updatedItem._id,
        },
        _.omitBy(props, _.isUndefined),
        {
          new: true,
        },
      );
      if (!item) throw new ItemNotFoundError();
      // await this.categoryService.findOneAndUpdate(
      //   {
      //     categoryId,
      //     _id: categoryId,
      //   },
      //   _.omitBy(props, _.isUndefined),
      //   {
      //     new: true,
      //   },
      // );
      return item;
    } catch (error) {

    }
  }
}
