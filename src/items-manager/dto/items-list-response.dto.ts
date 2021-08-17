import { NewItemResponseDTO } from './new-item-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ItemsListResponseDTO {
  @ApiProperty({ type: [NewItemResponseDTO] })
  data: NewItemResponseDTO[];

  @ApiProperty()
  offset: number;

  @ApiProperty()
  count: number;
}