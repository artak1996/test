import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { IsObjectIdString } from '../../common/validations';

export class RemoveCategoryRequestDTO {
  @ApiProperty({ type: 'string' })
  @IsObjectIdString()
  @IsNotEmpty()
  categoryId: Types.ObjectId;
}
