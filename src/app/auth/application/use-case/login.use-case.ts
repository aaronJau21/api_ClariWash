import { Inject, NotFoundException } from '@nestjs/common';
import {
  USER_REPOSITORY,
  type IUserRepository,
} from 'src/app/user/domain/repository/user-repository.interfce';
import { LoginDto } from '../dto/request/login.dto';
import { ArgonService } from 'src/lib/hash/argon.service';

export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,

    private readonly argonService: ArgonService,
  ) {}

  async execute(data: LoginDto) {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw new NotFoundException('Credenciales incorrectas');
    }

    const isPasswordValid = await this.argonService.verify(
      data.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new NotFoundException('Credenciales incorrectas');
    }

    return {
      msg: 'Login successful',
    };
  }
}
