import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { LogService } from '../log/log.service';
import { ConfigService } from '@nestjs/config';
import { PrivateTokenService } from '../private-token/private-token.service';
import { LoginUserDTO } from './dto/login-user.dto';
import { UserDocument } from '../users/users.schema';
import { isEmail } from 'class-validator';
import { EmailStatuses } from '../users/interfaces/user.interface';
import {
  EmailConfirmationLatterError,
  UnauthorizedError,
  UserEmailUniquenessError,
  UserNameUniquenessError,
} from '../common/error';
import { LoginUserResponseDTO } from './dto/login-user-response.dto';
import { SignUpUserDTO } from './dto/sign-up-user.dto';
import { SignUpUserResponseDTO } from './dto/sign-up-user.response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly logger: LogService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly privateTokenService: PrivateTokenService,
  ) {
    this.logger.setContext(AuthService.name);
  }

  private async validateUser(
    { login, password }: LoginUserDTO): Promise<UserDocument> {
    let user: UserDocument;
    if (isEmail(login)) {
      user = await this.userService.findOne({
        email: login,
      });
    } else {
      user = await this.userService.findOne({
        name: login,
        status: EmailStatuses.VERIFIED,
      });
    }
    if (!user) {
      throw new UnauthorizedError();
    }
    const isPasswordValid = await compare(password, user.password);
    console.log(isPasswordValid, 'password');
    if (!isPasswordValid) {
      throw new UnauthorizedError();
    }
    return user;
  }

  private generateToken(
    user: UserDocument,
    lifetime: number,
  ): LoginUserResponseDTO {
    const payload = { sub: user.id };
    const expires_in: number = Math.floor(new Date().getTime() / 1000) + lifetime;

    const refresh_token = this.jwtService.sign(payload, {
      expiresIn: `${this.config.get('JWT_REFRESH_TOKEN_LIFETIME')}s`,
      secret: this.config.get('JWT_REFRESH_SECRET'),
    });
    return {
      expires_in,
      access_token: this.jwtService.sign(payload, {
        expiresIn: `${lifetime}s`,
      }),
      refresh_token,
    };
  }

  async signUp(signUpUserDTO: SignUpUserDTO): Promise<SignUpUserResponseDTO> {
    this.logger.info('Sign Up a new user...');
    this.logger.debug(signUpUserDTO, 'New user data');
    const { name, email, password } = signUpUserDTO;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    let user;
    try {
      user = await this.userService.create({ name, email, password: hash });
    } catch (error) {
      this.logger.error(error, 'User sign up error');

      if (error.code === 11000) {
        if (error?.keyValue?.name) throw new UserNameUniquenessError();
        throw new UserEmailUniquenessError();
      }
      throw error;
    }
    try {
      const token = this.privateTokenService.encryptToken(
        { userId: user.id },
        this.config.get('EMAIL_SECRET'),
      );
      return { userId: user.id };

    } catch (error) {
      this.logger.error(error, 'Can\'t send email confirmation latter');
      throw new EmailConfirmationLatterError();
    }
  }

  async login(loginUserDto: LoginUserDTO): Promise<LoginUserResponseDTO> {
    this.logger.info('Login...');
    this.logger.debug(loginUserDto, 'Credentials');

    const user = await this.validateUser(loginUserDto);
    const tokenLifetime = loginUserDto.remember
      ? this.config.get('JWT_ACCESS_TOKEN_LIFETIME') * 30
      : this.config.get('JWT_ACCESS_TOKEN_LIFETIME');

    return this.generateToken(user, tokenLifetime);
  }
}
