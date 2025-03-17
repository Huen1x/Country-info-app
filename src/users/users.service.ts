import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { CalendarEvent } from '../entity/calendar-event.entity';
import { CountriesService } from '../countries/countries.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(CalendarEvent) private readonly calendarRepository: Repository<CalendarEvent>,
        private readonly countriesService: CountriesService,
    ) {}

    async addHolidaysToCalendar(userId: number, countryCode: string, year: string, holidays?: string[]) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException("User not found");
        }
    
        const publicHolidays = await this.countriesService.getPublicHolidays(countryCode, year);
        const selectedHolidays = holidays?.length
      ? publicHolidays.filter((holiday) => holidays.includes(holiday.localName))
      : publicHolidays;
      
      const calendarEvents = selectedHolidays.map((holiday) => {
        const event = new CalendarEvent();
        event.user = user;
        event.name = holiday.localName;
        event.date = holiday.date;
        return event;
      });
    
      await this.calendarRepository.save(calendarEvents);
      return { message: "Holidays added to calendar", events: calendarEvents };
    }
    
    async createUser(name: string): Promise<User> {
        const newUser = this.userRepository.create({ name });
        return this.userRepository.save(newUser);
    }

    async getUserHolidays(userId: number) {
        const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['calendarEvents'] });
        if (!user) {
            throw new NotFoundException("User not found");
        }
        return user.calendarEvents;
    }

    async deleteHoliday(userId: number, holidayId: number) {
        const holiday = await this.calendarRepository.findOne({ where: {id: holidayId, user: {id: userId } } });
        if (!holiday) {
            throw new NotFoundException("Holiday not found");
        }
        await this.calendarRepository.remove(holiday);
        return { message: "Holiday deleted successfully" };
    }
}