import { ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsJSON, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CategoriesListRequestDTO {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  search: string;

  @ApiPropertyOptional()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => String)
  @IsOptional()
  fields: string[];

  @ApiPropertyOptional({ default: 0 })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  offset: number;

  @ApiPropertyOptional({ default: 50 })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  limit: number;

  @ApiPropertyOptional({ type: 'jsonb' })
  @IsOptional()
  @IsJSON()
  sort: string;
}