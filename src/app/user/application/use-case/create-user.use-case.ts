import {
  BadRequestException,
  Inject,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import {
  type IUserRepository,
  USER_REPOSITORY,
} from '../../domain/repository/user-repository.interfce';
import { CreateUserDto } from '../dto/request/create-user.dto';
import { ArgonService } from 'src/lib/hash/argon.service';

export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    private readonly argonService: ArgonService,
  ) {}

  private logger = new Logger(CreateUserUseCase.name);

  async execute(data: CreateUserDto) {
    const user = await this.userRepository.findByEmail(data.email);
    if (user) {
      throw new BadRequestException('El usuario ya existe');
    }

    const hashedPassword = await this.argonService.hash(data.password);
    data.password = hashedPassword;

    try {
      await this.userRepository.create(data);
      return {
        msg: 'Creado correctamente',
      };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }
}
