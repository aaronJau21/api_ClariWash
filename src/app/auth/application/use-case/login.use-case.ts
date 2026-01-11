import { Inject, UnauthorizedException } from '@nestjs/common';
import {
  USER_REPOSITORY,
  type IUserRepository,
} from 'src/app/user/domain/repository/user-repository.interfce';
import { LoginDto } from '../dto/request/login.dto';
import { ArgonService } from 'src/lib/hash/argon.service';
import { JsonWebTService } from 'src/lib/json-web-t/json-web-t.service';
import { UserDto } from '../dto/response/user.dto';

export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,

    private readonly argonService: ArgonService,
    private readonly jsonWebTService: JsonWebTService,
  ) {}

  async execute(data: LoginDto) {
    const user = (await this.userRepository.findByEmail(data.email)) as UserDto;
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const isPasswordValid = await this.argonService.verify(
      data.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const token = await this.jsonWebTService.sign({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    return {
      msg: 'Login successful',
      token,
    };
  }
}
