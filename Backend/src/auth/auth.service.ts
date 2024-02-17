import { Injectable, Logger } from '@nestjs/common';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { SignupAuthDto } from './dto/signup-auth.dto';

import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

import { JwtService } from '@nestjs/jwt';
//import { jwtConstants } from './auth.constans';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createSignin(signinAuthDto: SigninAuthDto) {
    try {
      const userFound = await this.userRepository.findOne({
        where: { email: signinAuthDto.email },
      });
      if (!userFound) {
        this.logger.debug('User not found');
        return { msg: 'User not found' };
      }
      const isMatch = await bcrypt.compare(
        signinAuthDto.password,
        userFound.password,
      );
      console.log('password', isMatch);
      if (!isMatch) {
        this.logger.debug('Password incorrect');
        return { msg: 'Password incorrect' };
      }
      const payload = {
        sub: userFound.id,
        username: userFound.username,
      };
      this.logger.log('The user is accessed');
      return {
        msg: 'ok',
        data: {
          id: userFound.id,
          username: userFound.username,
          email: userFound.email,
          is_admin: userFound.is_admin,
          access_token: await this.jwtService.signAsync(payload),
        },
      };
    } catch (error) {
      this.logger.debug(error);
    }
  }

  async createSignup(signupAuthDto: SignupAuthDto) {
    try {
      if (
        signupAuthDto.username == '' ||
        signupAuthDto.email == '' ||
        signupAuthDto.password == ''
      ) {
        this.logger.log('Some params is null');
        return { msg: 'Some params is null' };
      }
      const userFound = await this.userRepository.findOne({
        where: { email: signupAuthDto.email },
      });
      if (userFound) {
        this.logger.log('User already exists');
        return { msg: 'User already exists' };
      }
      const newPassword = await bcrypt.hash(signupAuthDto.password, 10);
      const createUser = this.userRepository.create({
        username: signupAuthDto.username,
        email: signupAuthDto.email,
        password: newPassword,
        is_admin: signupAuthDto.is_admin,
      });

      const userSaved = await this.userRepository.save(createUser);
      const payload = {
        sub: userSaved.id,
        username: userSaved.username,
      };
      this.logger.log('The user is saved');
      return {
        msg: 'ok',
        data: {
          id: userSaved.id,
          username: userSaved.username,
          email: userSaved.email,
          is_admin: userSaved.is_admin,
          access_token: await this.jwtService.signAsync(payload),
        },
      };
    } catch (error) {
      this.logger.debug(error);
    }
  }

  async findOne(id: number) {
    try {
      const userFound = await this.userRepository.findOne({ where: { id } });
      if (!userFound) return { msg: 'Unauthorized' };
      this.logger.log('Info User');
      return { msg: 'ok', data: userFound };
    } catch (error) {
      this.logger.debug(error);
    }
  }
}
