import { Injectable } from '@nestjs/common';
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
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createSignin(signinAuthDto: SigninAuthDto) {
    const userFound = await this.userRepository.findOne({
      where: { email: signinAuthDto.email },
    });
    if (!userFound) {
      return { msg: 'User not found' };
    }
    const isMatch = await bcrypt.compare(
      signinAuthDto.password,
      userFound.password,
    );
    console.log('password', isMatch);
    if (!isMatch) {
      return { msg: 'Password incorrect' };
    }
    const payload = {
      sub: userFound.id,
      username: userFound.username,
    };
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
  }

  async createSignup(signupAuthDto: SignupAuthDto) {
    if (
      signupAuthDto.username == '' ||
      signupAuthDto.email == '' ||
      signupAuthDto.password == ''
    ) {
      return { msg: 'Some params is null' };
    }
    const userFound = await this.userRepository.findOne({
      where: { email: signupAuthDto.email },
    });
    if (userFound) {
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
  }

  async findOne(id: number) {
    const userFound = await this.userRepository.findOne({ where: { id } });

    if (!userFound) return { msg: 'Unauthorized' };
    return { msg: 'ok', data: userFound };
  }
}
