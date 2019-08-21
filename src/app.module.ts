import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApiModule } from './api.module';
import { AppController } from './app.controller';
import { DateScalar } from './shared/date.scalar';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: false,
      dropSchema: false,
      logging: true,
      entities: [
        __dirname + '/shared/entities/*.entity.*',
      ],
      migrations: [
        __dirname + '/db/migrations/*',
      ],
    }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => ({ headers: req.headers }),
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [DateScalar],
})
export class AppModule {}
