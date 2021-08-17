import { Types } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsObjectIdString } from '../../common/validations';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateItemRequestDTO {
  @ApiProperty({ type: 'string' })
  @IsObjectIdString()
  @IsNotEmpty()
  _id: Types.ObjectId;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsNumber()
  price: number;


  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty()
  @IsBoolean()
  available: boolean;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  categoryId: Types.ObjectId
}