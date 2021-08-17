import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { createCipheriv, randomBytes } from 'crypto';

import { LogService } from '../log/log.service';
import { ConfigService } from '@nestjs/config';
import { UserData } from './types/decrypted-token.type';


@Injectable()

export class PrivateTokenService {
  constructor(
    private readonly logger: LogService,
    private readonly config: ConfigService,
  ) {
    this.logger.setContext(PrivateTokenService.name);
  }


  encryptToken<T>(
    payload: T & UserData,
    secret: string,
    exp: DateTime = DateTime.utc().plus({
      hours: this.config.get('EMAIL_TOKEN_LIFETIME'),
    }),
  ): string {
    const iv = randomBytes(16);
    const cipher = createCipheriv('aes-256-ctr', secret, iv);

    const data = JSON.stringify({
      payload,
      exp,
    });
    const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);

    return `${iv.toString('hex')}.${encrypted.toString('hex')}`;
  }

}

