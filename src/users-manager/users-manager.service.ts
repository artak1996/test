import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrivateTokenService } from '../private-token/private-token.service';
import { LogService } from '../log/log.service';
import { UsersService } from '../users/users.service';
import { Types } from 'mongoose';

import { UserResponseDTO } from './dto/user-response.dto';
import { GetUserError, UserNotFoundError } from '../common/error';

@Injectable()
export class UsersManagerService {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: LogService,
    private readonly privateTokenService: PrivateTokenService,
    private readonly config: ConfigService,
  ) {
    this.logger.setContext(UsersManagerService.name);
  }


  async getUser(id: Types.ObjectId): Promise<UserResponseDTO> {
    this.logger.info('Get user info...');
    this.logger.debug('User %s', id);

    try {
      const user = await this.usersService.findOne({ _id: id });
      if (!user) throw new UserNotFoundError();
      const { _id, name, email, status, avatar } = user;
      return {
        id: _id, name, email, status, avatar,
      };
    } catch (error) {
      this.logger.error(error, 'Can\'t get user!');
      if (error?.status === 404) throw error;
      throw new GetUserError();
    }
  }

  async getAll(): Promise<UserResponseDTO[]> {
    this.logger.info('Get users info...');
    try {
      const users = await this.usersService.find();
      return users.map(user => {
        const { _id, name, email, status, avatar } = user;
        return {
          id: _id, name, email, status, avatar,
        };
      });
    } catch (error) {

    }
  }
}
