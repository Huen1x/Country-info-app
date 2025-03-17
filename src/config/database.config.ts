import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/entity/user.entity";
import { CalendarEvent } from "src/entity/calendar-event.entity";
import 'dotenv/config'

export const dataSourceOptions: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'postgress',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'country_info_app',
    entities: [User, CalendarEvent],
    synchronize: true,
};