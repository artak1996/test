import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { LogService } from './log/log.service';
import { AppExceptionsFilter } from './common/app-exceptions.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: {
      origin: true,
      preflightContinue: false,
    }});
  const logService = await app.resolve(LogService);
  app.useGlobalFilters(new AppExceptionsFilter(logService));
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('simple sign-up & login')
    .setDescription('The auth API description')
    .setVersion('1.0')
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(configService.get('PORT'));
}

bootstrap();
