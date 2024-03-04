import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmConfig } from './configuration/typeorm.configuration';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfig,
      inject: [ConfigService],
    }),
  ],
  providers: [TypeOrmConfig],
  exports: [TypeOrmConfig],
})
export class DatabaseModule {}
