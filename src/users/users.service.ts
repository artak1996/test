import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model, FilterQuery, QueryOptions } from 'mongoose';

import { User, UserDocument, UserSchemaName } from './users.schema';
import { LogService } from '../log/log.service';
import { UserInterface } from './interfaces/user.interface';
import { SetPasswordInterface } from './interfaces/set-password.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserSchemaName)
    private readonly userModel: Model<UserDocument>,
    private readonly logger: LogService,
  ) {
    this.logger.setContext(UsersService.name);
  }

  create(user: UserInterface): Promise<UserDocument> {
    this.logger.info('Save user...');
    this.logger.debug(user, 'User data');

    return new this.userModel(user).save();
  }

  findOne(
    filters: FilterQuery<User>,
    projection?: any | null,
    options: QueryOptions = {},
  ): Promise<UserDocument> {
    this.logger.info('Find user...');
    this.logger.debug(filters, 'Filters');

    return this.userModel.findOne(filters, projection, options).exec();
  }

  find() {
    return this.userModel.find().exec();
  }

  findOneAndUpdate(
    filters: FilterQuery<User>,
    data: any | null,
    options: QueryOptions = {},
  ): Promise<User> {
    this.logger.info('Find and update user...');
    this.logger.debug(filters, 'Filters');

    return this.userModel.findOneAndUpdate(filters, data, options).exec();
  }

  updateOne(
    filters: FilterQuery<User>,
    data: any | null,
    options: QueryOptions = {},
  ) {
    this.logger.info('Update user...');
    this.logger.debug(filters, 'Filters');

    return this.userModel.updateOne(filters, data, options).exec();
  }

  async setPassword({ password, userId }: SetPasswordInterface) {
    this.logger.info('Set user password...');
    this.logger.debug('User id: %s', userId);

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return this.updateOne({ _id: userId }, { password: hash }, { new: true });
  }
}
