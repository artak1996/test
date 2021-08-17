import { ApiProperty } from '@nestjs/swagger';

export class LoginUserResponseDTO {
  @ApiProperty()
  expires_in: number;

  @ApiProperty()
  access_token: string;

  @ApiProperty()
  refresh_token: string;
}
