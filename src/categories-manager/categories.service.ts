import { Injectable } from '@nestjs/common';
import { LogService } from '../log/log.service';
import { CategoryRequestDTO } from './dto/category-request.dto';
import { CategoryResponseDTO } from './dto/category-response.dto';
import { CategoriesService } from '../categories/categories.service';
import {
  CategoryAlreadyExists,
  CategoryNotFoundError,
  GetCategoriesListError,
  RemoveCategoryError,
} from '../common/error';
import { CategoriesListRequestDTO } from './dto/categories-list-request.dto';
import { CategoriesListResponseDTO } from './dto/categories-list-response.dto';
import { Types } from 'mongoose';

@Injectable()
export class CategoriesManagerService {
  constructor(
    private readonly logger: LogService,
    private readonly categoryService: CategoriesService,
  ) {
    this.logger.setContext(CategoriesManagerService.name);
  }

  async create(newCategory: CategoryRequestDTO): Promise<CategoryResponseDTO> {
    const { name } = newCategory;
    try {
      let category = await this.categoryService.findOne({ name });
      if (category) {
        throw new CategoryAlreadyExists();
      }
      category = await this.categoryService.create({ name });
      return category;
    } catch (error) {
      this.logger.error('Can\'t save category', error);
      return error;
    }
  }

  async find(opts: CategoriesListRequestDTO): Promise<CategoriesListResponseDTO> {
    const searchFilter: any = {};
    if (opts.search) {
      searchFilter.name =
        {
            '$regex': opts.search,
            '$options': 'i',
          }
    }
    try {
      console.log(opts,'opts')
      const categories = await this.categoryService.find(
        searchFilter,
        opts?.fields,
        {
          limit: opts?.limit || 50,
          skip: opts?.offset || 0,
          sort: opts?.sort && JSON.parse(opts.sort),
        });
      return {
        data: categories, offset: opts?.offset, count: categories.length,
      };
    } catch (error) {
      this.logger.error(error, "Can't get list of user casts");
      throw new GetCategoriesListError();

    }
  }

  async remove (categoryId:Types.ObjectId):Promise<void> {
    this.logger.info('Remove category request...');
    this.logger.debug({  categoryId }, 'Options');
    try {
      const category = await this.categoryService.findOne({_id:categoryId})
      if (!category) throw new CategoryNotFoundError()

      const res = await this.categoryService.deleteOne({_id: categoryId})
      this.logger.debug(res, 'Remove result');

    } catch (error) {
      if (error.status === 404) throw error;
      this.logger.error(error, `Can't remove user cast ${categoryId}`);
      throw new RemoveCategoryError();
    }
  }
}
