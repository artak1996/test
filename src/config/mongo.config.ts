import { registerAs } from '@nestjs/config';

export default registerAs('mongo', () => {
  return {
    uri: `mongodb://${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`,
    connectionOptions: {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    },
  }
})
