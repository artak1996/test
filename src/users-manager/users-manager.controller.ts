import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersManagerService } from './users-manager.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth, ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation, ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserResponseDTO } from './dto/user-response.dto';
import { UserData } from '../common/decorators/user-data.decorator';

@ApiTags('users')
@Controller('users')
export class UsersManagerController {
  constructor(private readonly usersManagerService: UsersManagerService) {}

  @Get()
  @ApiBearerAuth('Bearer Token')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Return user info',
  })
  @ApiOkResponse({ type: UserResponseDTO, description: 'Success' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  getUser(@UserData() user): Promise<UserResponseDTO> {
    return this.usersManagerService.getUser(user.id);
  }

  @Get('all')
  @ApiBearerAuth('Bearer Token')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Return users info',
  })
  @ApiOkResponse({ type: UserResponseDTO, description: 'Success' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  getUsers(): Promise<UserResponseDTO[]> {
    return this.usersManagerService.getAll()
  }
}
