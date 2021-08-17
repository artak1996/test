import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpUserResponseDTO } from './dto/sign-up-user.response.dto';
import { SignUpUserDTO } from './dto/sign-up-user.dto';
import { LoginUserResponseDTO } from './dto/login-user-response.dto';
import { LoginUserDTO } from './dto/login-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Register new user',
  })
  @ApiCreatedResponse({ type: SignUpUserResponseDTO, description: 'Success' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async signUp(
    @Body() signUpUserDTO: SignUpUserDTO,
  ): Promise<SignUpUserResponseDTO> {
    return this.authService.signUp(signUpUserDTO);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Login',
  })
  @ApiOkResponse({ type: LoginUserResponseDTO, description: 'Success' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async login(
    @Body() loginUserDto: LoginUserDTO,
  ): Promise<LoginUserResponseDTO> {
    return this.authService.login(loginUserDto);
  }
}
