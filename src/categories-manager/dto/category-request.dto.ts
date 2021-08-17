import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { ItemInterface } from '../../items/interfaces/item.interface';
import { ItemResponseDTO } from '../../items-manager/dto/item-response.dto';

export class CategoryRequestDTO {
  @ApiProperty()
  @IsString()
  name: string

  // @ApiProperty()
  // @IsOptional()
  // items: [ItemResponseDTO]
}