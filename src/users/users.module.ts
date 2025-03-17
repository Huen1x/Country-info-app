import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HttpModule } from "@nestjs/axios";
import { User } from "src/entity/user.entity";
import { CalendarEvent } from "src/entity/calendar-event.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { CountriesService } from "src/countries/countries.service";

@Module({
    imports: [TypeOrmModule.forFeature([User, CalendarEvent]), HttpModule],
    controllers: [UsersController],
    providers: [UsersService, CountriesService],
})
export class UsersModule {}