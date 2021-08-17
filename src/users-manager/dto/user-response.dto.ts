import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EmailStatuses } from '../../users/interfaces/user.interface';

export class UserResponseDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ format: 'email' })
  email: string;

  @ApiProperty({ enum: EmailStatuses ,enumName: 'EmailStatues'})
  status: EmailStatuses;

  @ApiPropertyOptional({ format: 'url' })
  avatar: string;
}
