import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      this.logger.log('User has been created successfully');
      return this.usersService.create(createUserDto);
    } catch (error) {
      this.logger.debug(error);
    }
  }

  @Get()
  findAll() {
    try {
      this.logger.log('Get all users');
      return this.usersService.findAll();
    } catch (error) {
      this.logger.debug(error);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      this.logger.log('Get user by id');
      return this.usersService.findOne(+id);
    } catch (error) {
      this.logger.debug(error);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      this.logger.log('The user has been updated successfully');
      return this.usersService.update(+id, updateUserDto);
    } catch (error) {
      this.logger.debug(error);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      this.logger.log('The user has been deleted');
      return this.usersService.remove(+id);
    } catch (error) {
      this.logger.debug(error);
    }
  }
}
