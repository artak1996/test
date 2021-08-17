import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { regExpPassword } from '../../common/validations';

export class LoginUserDTO {
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  login: string;

  @ApiProperty()
  @Transform(({ value }) => value?.trim())
  @Matches(regExpPassword)
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional({ type: Boolean })
  @IsBoolean()
  remember = false;
}
