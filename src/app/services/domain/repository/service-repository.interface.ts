import { Service } from '../entities/service.entity'
import { CreateServiceDto } from '../../application/dto/request/create-service.dto';
import { GlobalRepository } from 'src/shared/repository/global-repository.interface';

export const SERVICE_REPOSITORY = 'SERVICE_REPOSITORY';

export interface ServiceRepository extends GlobalRepository<
  Service,
  CreateServiceDto
> {
  findNamy(name: string): Promise<Service | null>;
}
