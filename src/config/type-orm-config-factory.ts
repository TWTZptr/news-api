import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfigFactory = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DB.HOST'),
  port: configService.get('DB.PORT'),
  username: configService.get('DB.USERNAME'),
  password: configService.get('DB.PASSWORD'),
  database: configService.get('DB.DATABASE'),
  entities: [],
  synchronize: true,
  autoLoadEntities: true,
});
