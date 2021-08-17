import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CategoryResponseDTO } from '../../categories-manager/dto/category-response.dto';

export class ItemResponseDTO {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: CategoryResponseDTO })
  category: CategoryResponseDTO;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiPropertyOptional({ format: 'url' })
  image: string;

  @ApiProperty()
  available: boolean;
}
