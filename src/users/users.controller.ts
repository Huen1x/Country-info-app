import { Controller, Post, Get, Delete, Param, Body } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "src/entity/user.entity";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async createuser(@Body('name') name: string): Promise<User> {
        return this.usersService.createUser(name);
    }
    
    @Post(':userId/calendar/holidays')
    async addHolidaysToCalendar(
        @Param('userId') userId: number,
        @Body('countryCode') countryCode: string,
        @Body('year') year: string,
        @Body('holidays') holidays?: string[],
    ){
        return this.usersService.addHolidaysToCalendar(userId, countryCode, year, holidays)
    }

    @Get(':userId/calendar/holidays')
    async getUserHolidays(@Param('userId') userId: number) {
        return this.usersService.getUserHolidays(userId);
    }

    @Delete(':userId/calendar/holidays/:holidayId')
    async deleteHoliday(@Param('userId') userId: number, @Param('holidayId') holidayId: number) {
        return this.usersService.deleteHoliday(userId, holidayId);
    }
}