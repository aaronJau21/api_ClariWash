import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LoginUseCase } from '../application/use-case/login.use-case';
import { LoginDto } from '../application/dto/request/login.dto';
import { type Response } from 'express';
import { AuthGuardGuard } from 'src/guard/auth-guard/auth-guard.guard';
import { type AuthenticatedRequest } from 'src/shared/types/request.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { msg, token } = await this.loginUseCase.execute(loginDto);

    res.cookie('access_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1 * 60 * 1000,
      path: '/',
    });

    return { msg };
  }

  @UseGuards(AuthGuardGuard)
  @Get('me')
  me(@Req() req: AuthenticatedRequest) {
    return req.user;
  }
}
