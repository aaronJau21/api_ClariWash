import { Body, Controller, Post } from '@nestjs/common';
import { LoginUseCase } from '../application/use-case/login.use-case';
import { LoginDto } from '../application/dto/request/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.loginUseCase.execute(loginDto);
  }
}
