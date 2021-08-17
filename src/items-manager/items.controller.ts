import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { ItemsManagerService } from './items-manager.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse, ApiInternalServerErrorResponse,
  ApiNotFoundResponse, ApiOkResponse,
  ApiOperation, ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { NewItemResponseDTO } from './dto/new-item-response.dto';
import { ItemsListResponseDTO } from './dto/items-list-response.dto';
import { ItemsListRequestDTO } from './dto/items-list-request.dto';

@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsManagerService:ItemsManagerService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create item',
  })
  @ApiCreatedResponse({
    type: NewItemResponseDTO,
    description: 'Item is created',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  register(@Body() newItem:NewItemResponseDTO) {
    console.log(newItem,1111)
    return this.itemsManagerService.create(newItem)
  }


  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'List user casts',
  })
  @ApiOkResponse({
    type: ItemsListResponseDTO,
    description: 'OK',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  list(
    @Query() params: ItemsListRequestDTO,
  ): Promise<ItemsListResponseDTO> {
    return this.itemsManagerService.list(params);
  }
}
