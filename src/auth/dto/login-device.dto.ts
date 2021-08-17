import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginDeviceDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  deviceId: string;
}
