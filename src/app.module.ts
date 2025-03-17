import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CountriesModule } from './countries/countries.module';
import { UsersModule } from './users/users.module';
import { dataSourceOptions } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule,
    UsersModule,
    CountriesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
