import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../application/use-case/create-user.use-case';
import { CreateUserDto } from '../application/dto/request/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.createUserUseCase.execute(createUserDto);
  }
}
