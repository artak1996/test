import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class NewItemResponseDTO {
  @ApiPropertyOptional()
  _id?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiPropertyOptional()
  image?: string;

  @ApiProperty()
  available: boolean;

  @ApiProperty({ type: 'string' })
  categoryId: Types.ObjectId;

  @ApiProperty({ format: 'date-time' })
  createdAt?: Date;

  @ApiProperty({ format: 'date-time' })
  updatedAt?: Date;
}