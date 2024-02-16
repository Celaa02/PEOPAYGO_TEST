import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({ name: 'timesheet' })
export class Timesheet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Employee: string;

  @Column('decimal', { precision: 6, scale: 2 })
  Hourly_rate: number;

  @Column()
  hours: number;

  @Column('decimal', { precision: 6, scale: 2 })
  total_pay: number;

  @Column()
  status: string;

  @Column()
  id_user: number;
}
