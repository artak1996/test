import { CategoryResponseDTO } from './category-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CategoriesListResponseDTO {
  @ApiProperty({ type: [CategoryResponseDTO] })
  data: CategoryResponseDTO[]

  @ApiProperty()
  offset: number;

  @ApiProperty()
  count: number;
}