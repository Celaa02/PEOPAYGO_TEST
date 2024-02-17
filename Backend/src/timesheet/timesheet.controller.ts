import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Res,
  Logger,
} from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.strategy';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../auth/auth.constans';

@ApiTags('timesheet')
@Controller('timesheet')
export class TimesheetController {
  private readonly logger = new Logger(TimesheetController.name);

  constructor(
    private readonly timesheetService: TimesheetService,
    private jwtService: JwtService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body() createTimesheetDto: CreateTimesheetDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const payload = await this.jwtService.verifyAsync(
        req.headers.cookie.slice(6),
        {
          secret: jwtConstants.secret,
        },
      );
      const result = await this.timesheetService.create(
        createTimesheetDto,
        payload.sub,
      );
      res.status(200).json(result);
      this.logger.log('TimeSheet has been created');
    } catch (error) {
      this.logger.debug(error);
      res.status(401).json(['Unauthorized']);
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(@Req() req: Request, @Res() res: Response) {
    try {
      const payload = await this.jwtService.verifyAsync(
        req.headers.cookie.slice(6),
        {
          secret: jwtConstants.secret,
        },
      );
      const result = await this.timesheetService.findUser(payload.sub);
      res.status(200).json(result);
      this.logger.log('Decode token successfully');
    } catch (error) {
      res.status(401).json(['Unauthorized']);
      this.logger.debug(error);
    }
    this.logger.log('user timesheet');
    return this.timesheetService.findAll();
  }

  @Get('all')
  @UseGuards(AuthGuard)
  findall() {
    try {
      this.logger.log('All timesheet');
      return this.timesheetService.findAll();
    } catch (error) {
      this.logger.debug(error);
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: number) {
    try {
      this.logger.log('One timesheet');
      return this.timesheetService.findOne(+id);
    } catch (error) {
      this.logger.debug(error);
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTimesheetDto: UpdateTimesheetDto,
  ) {
    try {
      this.logger.log('The timesheet has been update successfully');
      return this.timesheetService.update(+id, updateTimesheetDto);
    } catch (error) {
      this.logger.debug(error);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    try {
      this.logger.log('The timesheet has been delete successfully');
      return this.timesheetService.remove(+id);
    } catch (error) {
      this.logger.log(error);
    }
  }
}
