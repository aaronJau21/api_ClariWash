import { GlobalRepository } from 'src/shared/repository/global-repository.interface';
import { Client } from '../entities/client.entity';
import { CreateClientDto } from '../../application/dto/request/create-client.dto';

export const CLIENT_REPOSITORY = 'CLIENT_REPOSITORY';

export interface IClientRepository extends GlobalRepository<
  Client,
  CreateClientDto
> {
  findByPhone(phone: string): Promise<Client | null>;
}
