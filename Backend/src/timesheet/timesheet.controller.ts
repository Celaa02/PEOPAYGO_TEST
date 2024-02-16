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
    } catch (error) {
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
    } catch (error) {
      res.status(401).json(['Unauthorized']);
    }
    return this.timesheetService.findAll();
  }

  @Get('all')
  @UseGuards(AuthGuard)
  findall() {
    try {
      return this.timesheetService.findAll();
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: number) {
    try {
      return this.timesheetService.findOne(+id);
    } catch (error) {
      console.log(error);
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTimesheetDto: UpdateTimesheetDto,
  ) {
    try {
      return this.timesheetService.update(+id, updateTimesheetDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    try {
      return this.timesheetService.remove(+id);
    } catch (error) {
      console.log(error);
    }
  }
}
