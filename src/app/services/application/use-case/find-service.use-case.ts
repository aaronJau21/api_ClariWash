import { Inject } from '@nestjs/common';
import {
  SERVICE_REPOSITORY,
  type ServiceRepository,
} from '../../domain/repository/service-repository.interface';
import { FindServiceResponseDto } from '../dto/response/find-service.response';

export class FindServiceUseCase {
  constructor(
    @Inject(SERVICE_REPOSITORY)
    private readonly serviceRepository: ServiceRepository,
  ) {}

  async execute(): Promise<FindServiceResponseDto[]> {
    const services =
      (await this.serviceRepository.findAll()) as FindServiceResponseDto[];
    return services.map(
      (service) =>
        new FindServiceResponseDto(
          service.id,
          service.name,
          service.description,
          service.price,
          service.amount,
          service.icon,
        ),
    );
  }
}
