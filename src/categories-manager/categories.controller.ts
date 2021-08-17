import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query, UseFilters } from '@nestjs/common';
import { CategoriesManagerService } from './categories.service';
import { CategoryRequestDTO } from './dto/category-request.dto';
import { MongoExceptionFilter } from '../common/mongo.exception.filter';
import {
  ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation, ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CategoriesListResponseDTO } from './dto/categories-list-response.dto';
import { UserData } from '../common/decorators/user-data.decorator';
import { CategoriesListRequestDTO } from './dto/categories-list-request.dto';
import { RemoveCategoryRequestDTO } from './dto/remove-category-request.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesManagerService: CategoriesManagerService) {
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  @UseFilters(MongoExceptionFilter)
  register(@Body() newCategory: CategoryRequestDTO) {
    return this.categoriesManagerService.create(newCategory);
  }


  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'List categories',
  })
  @ApiOkResponse({
    type: CategoriesListResponseDTO,
    description: 'OK',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  list(
    @Query() params: CategoriesListRequestDTO,
  ): Promise<CategoriesListResponseDTO> {
    console.log(params,'asdsad')
    return this.categoriesManagerService.find(params);
  }

  @Delete(':categoryId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete category',
  })
  @ApiNoContentResponse({ description: 'Category was removed' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  remove(
    @Param() params: RemoveCategoryRequestDTO,
    @UserData() user,
  ): Promise<void> {
    return this.categoriesManagerService.remove(params.categoryId);
  }
}
