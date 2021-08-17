import { ApiProperty } from '@nestjs/swagger';

export class SignUpUserResponseDTO {
  @ApiProperty()
  userId: string;
}