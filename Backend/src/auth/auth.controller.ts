import {
  Controller,
  Post,
  Get,
  Body,
  Res,
  Req,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard } from './auth.strategy';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './auth.constans';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authGuard: AuthGuard,
    private jwtService: JwtService,
  ) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() signinAuthDto: SigninAuthDto, @Res() res: Response) {
    try {
      const result = await this.authService.createSignin(signinAuthDto);
      if (result.msg == 'ok') {
        res
          .status(200)
          .setHeader('Authorization', 'Bearer ' + result.data.access_token)
          .cookie('token', result.data.access_token, {
            sameSite: 'none',
            secure: true,
            httpOnly: false,
          })
          .json({
            success: true,
            token: result.data.access_token,
            data: {
              id: result.data.id,
              username: result.data.username,
              email: result.data.email,
              is_admin: result.data.is_admin,
            },
          });
      } else {
        if (result.msg == 'User not found') {
          res.status(403).json(['User not found']);
        } else if (result.msg == 'Password incorrect') {
          res.status(409).json(['Password incorrect']);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  @Post('signup')
  async signup(@Body() signupAuthDto: SignupAuthDto, @Res() res: Response) {
    const result = await this.authService.createSignup(signupAuthDto);
    if (result.msg == 'ok') {
      res
        .status(200)
        .setHeader('Authorization', 'Bearer ' + result.data.access_token)
        .cookie('token', result.data.access_token)
        .json({
          success: true,
          token: result.data.access_token,
          data: {
            id: result.data.id,
            username: result.data.username,
            email: result.data.email,
            is_admin: result.data.is_admin,
          },
        });
    } else {
      if (result.msg == 'Some params is null') {
        res.status(403).json(['Some params is null']);
      } else if (result.msg == 'User already exists') {
        res.status(409).json(['User already exists']);
      }
    }
  }

  @Get('verifyToken')
  async finUser(@Req() req, @Res() res: Response) {
    if (!req.headers.cookie.slice(6)) {
      res.status(401).json(['Unauthorized']);
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        req.headers.cookie.slice(6),
        {
          secret: jwtConstants.secret,
        },
      );
      const result = await this.authService.findOne(payload.sub);
      res.status(200).json({
        id: result.data.id,
        username: result.data.username,
        email: result.data.email,
        is_admin: result.data.is_admin,
      });
    } catch (error) {
      res.status(401).json(['Unauthorized']);
    }
  }

  @Get('/logout')
  logout(@Request() req): any {
    try {
      req.session = null;
      return { msg: 'The user session has ended' };
    } catch (error) {
      console.log(error);
    }
  }
}
