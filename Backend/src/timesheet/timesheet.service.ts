import { Injectable } from '@nestjs/common';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Timesheet } from './entities/timesheet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TimesheetService {
  constructor(
    @InjectRepository(Timesheet)
    private timeRepository: Repository<Timesheet>,
  ) {}

  async create(createTimesheetDto: CreateTimesheetDto, id: number) {
    console.log(createTimesheetDto);
    const createTime = this.timeRepository.create({
      Employee: createTimesheetDto.Employee,
      Hourly_rate: createTimesheetDto.Hourly_rate,
      hours: createTimesheetDto.hours,
      total_pay: createTimesheetDto.total_pay,
      status: 'pending',
      id_user: id,
    });
    return this.timeRepository.save(createTime);
  }

  findAll() {
    return this.timeRepository.find();
  }

  findOne(id: number) {
    return this.timeRepository.findOne({ where: { id } });
  }

  findUser(id: number) {
    return this.timeRepository.find({ where: { id_user: id } });
  }

  update(id: number, updateTimesheetDto: UpdateTimesheetDto) {
    return this.timeRepository.save({ id, ...updateTimesheetDto });
  }

  remove(id: number) {
    return this.timeRepository.delete({ id });
  }
}
