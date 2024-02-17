import { Injectable, Logger } from '@nestjs/common';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Timesheet } from './entities/timesheet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TimesheetService {
  private readonly logger = new Logger(TimesheetService.name);

  constructor(
    @InjectRepository(Timesheet)
    private timeRepository: Repository<Timesheet>,
  ) {}

  async create(createTimesheetDto: CreateTimesheetDto, id: number) {
    try {
      const createTime = this.timeRepository.create({
        Employee: createTimesheetDto.Employee,
        Hourly_rate: createTimesheetDto.Hourly_rate,
        hours: createTimesheetDto.hours,
        total_pay: createTimesheetDto.total_pay,
        status: 'pending',
        id_user: id,
      });
      this.logger.log('Timesheet has been created');
      return this.timeRepository.save(createTime);
    } catch (error) {
      this.logger.debug(error);
    }
  }

  findAll() {
    try {
      return this.timeRepository.find();
    } catch (error) {
      this.logger.debug(error);
    }
  }

  findOne(id: number) {
    try {
      return this.timeRepository.findOne({ where: { id } });
    } catch (error) {
      this.logger.debug(error);
    }
  }

  findUser(id: number) {
    try {
      return this.timeRepository.find({ where: { id_user: id } });
    } catch (error) {
      this.logger.debug(error);
    }
  }

  update(id: number, updateTimesheetDto: UpdateTimesheetDto) {
    try {
      return this.timeRepository.save({ id, ...updateTimesheetDto });
    } catch (error) {
      this.logger.debug(error);
    }
  }

  remove(id: number) {
    try {
      return this.timeRepository.delete({ id });
    } catch (error) {
      this.logger.debug(error);
    }
  }
}
