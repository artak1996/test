import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDTO {

  @ApiProperty()
  name: string;
}
