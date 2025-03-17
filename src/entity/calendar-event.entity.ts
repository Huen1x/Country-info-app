import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class CalendarEvent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    date: string;

    @ManyToOne(() => User, (user) => user.calendarEvents, { onDelete: 'CASCADE' })
    user: User;
}
