import { Inject, NotFoundException } from '@nestjs/common';
import { Service } from '../../domain/entities/service.entity';
import {
  SERVICE_REPOSITORY,
  type ServiceRepository,
} from '../../domain/repository/service-repository.interface';
import { UpdateServiceDto } from '../dto/request/update-service.dto';
import { CreateServiceDto } from '../dto/request/create-service.dto';

export class UpdateServiceUseCase {
  constructor(
    @Inject(SERVICE_REPOSITORY)
    private readonly serviceRepository: ServiceRepository,
  ) {}

  async execute(id: string, data: UpdateServiceDto): Promise<Service> {
    const service = await this.serviceRepository.findOne(id);

    if (!service) {
      throw new NotFoundException('Servicio no encontrado');
    }

    return await this.serviceRepository.update(id, data as CreateServiceDto);
  }
}
