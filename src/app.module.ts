import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PasswordsModule } from './passwords/passwords.module';
import { typeOrmConfigFactory } from './config/type-orm-config-factory';
import { PassportModule } from '@nestjs/passport';
import { NewsModule } from './news/news.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    PassportModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfigFactory,
    }),
    UsersModule,
    PasswordsModule,
    NewsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
