import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KimerasModule } from './modules/kimeras.module';
import { AppDataSource } from './data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT, 10) : undefined,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: AppDataSource.options['synchronize'],
      logging: AppDataSource.options['logging'],
      entities: AppDataSource.options['entities'],
      migrations: AppDataSource.options['migrations'],
      subscribers: AppDataSource.options['subscribers'],
    }),
    KimerasModule,
  ],
})
export class AppModule {}
