import {
  BadRequestException,
  Inject,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import {
  CLIENT_REPOSITORY,
  type IClientRepository,
} from '../../domain/repository/client-repository.interface';
import { CreateClientDto } from '../dto/request/create-client.dto';
import { Response } from 'src/shared/response/response.response';


export class CreateClientUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: IClientRepository,
  ) { }

  private logger = new Logger(CreateClientUseCase.name);

  async execute(data: CreateClientDto) {
    const client = await this.clientRepository.findByPhone(data.phone);
    if (client) {
      throw new BadRequestException('El cliente ya existe');
    }

    try {
      await this.clientRepository.create(data);
      return {
        msg: Response.responseSuccess,
      };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(Response.responseErrorServer);
    }
  }
}
