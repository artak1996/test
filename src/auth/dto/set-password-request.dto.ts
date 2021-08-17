import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, Matches } from 'class-validator';
import { regExpPassword } from '../../common/validations';

export class SetPasswordRequestDto {
  @ApiProperty()
  @IsString()
  token: string;

  @ApiProperty()
  @Transform(({ value }) => value?.trim())
  @Matches(regExpPassword)
  password: string;
}
