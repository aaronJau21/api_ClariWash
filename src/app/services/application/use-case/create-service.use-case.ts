import { ConflictException, Inject } from '@nestjs/common';
import { Service } from '../../domain/entities/service.entity';
import {
  SERVICE_REPOSITORY,
  type ServiceRepository,
} from '../../domain/repository/service-repository.interface';
import { CreateServiceDto } from '../dto/request/create-service.dto';

export class CreateServiceUseCase {
  constructor(
    @Inject(SERVICE_REPOSITORY)
    private readonly serviceRepository: ServiceRepository,
  ) {}

  async execute(data: CreateServiceDto): Promise<Service> {
    const service = await this.serviceRepository.findNamy(data.name);

    if (service) {
      throw new ConflictException('El servicio ya existe');
    }

    return await this.serviceRepository.create(data);
  }
}
