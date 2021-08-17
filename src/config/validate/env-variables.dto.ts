import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

enum Environment {
  DEV = 'development',
  PROD = 'production',
  TEST = 'test',
  STAGE = 'staging',
}

export class EnvironmentVariablesDto {
  @IsOptional()
  @IsEnum(Environment)
  NODE_ENV = Environment.DEV;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  PORT = 3000;

  @IsUrl({ require_tld: false })
  SERVICE_BASE_URL: string;

  @IsOptional()
  @IsString()
  MONGO_DB_NAME = 'userauth';

  @IsString()
  MONGO_HOSTNAME: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  MONGO_PORT = 27017;

  @IsString()
  JWT_SECRET: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  EMAIL_TOKEN_LIFETIME = 24;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  JWT_ACCESS_TOKEN_LIFETIME = 1000;

  @IsString()
  JWT_REFRESH_SECRET: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  JWT_REFRESH_TOKEN_LIFETIME = 864000;
}