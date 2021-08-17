import { registerAs } from '@nestjs/config';

export default registerAs('LOGGER_CONFIG', () => {
  const isProduction = process.env.NODE_ENV === 'production';

  const prettyPrintOpts = {
    ignore: 'pinoLoggerContext,hostname',
    translateTime: true,
    messageFormat: '{pinoLoggerContext} {msg}',
  };

  return {
    level: isProduction ? 'info' : 'debug',
    prettyPrint: !isProduction && prettyPrintOpts,
    autoLogging: isProduction,
    redact: isProduction ? [] : ['req'],
  };
});
