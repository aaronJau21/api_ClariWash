import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateServiceDto } from 'src/app/services/application/dto/request/create-service.dto';
import { UpdateServiceDto } from 'src/app/services/application/dto/request/update-service.dto';
import { Service } from 'src/app/services/domain/entities/service.entity';
import { ServiceRepository } from 'src/app/services/domain/repository/service-repository.interface';

export class ServiceRepositoryMongo implements ServiceRepository {
  constructor(
    @InjectModel(Service.name) private readonly serviceModel: Model<Service>,
  ) {}

  async findNamy(name: string): Promise<Service | null> {
    const service = await this.serviceModel.findOne({ name });

    return service || null;
  }
  async findAll() {
    const services = await this.serviceModel.find();

    return services;
  }
  async findOne(id: string): Promise<Service> {
    const service = await this.serviceModel.findById(id);

    return service!;
  }
  async create(data: CreateServiceDto): Promise<Service> {
    const service = await this.serviceModel.create(data);

    return service.save();
  }
  async update(id: string, data: UpdateServiceDto): Promise<Service> {
    const service = await this.serviceModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    return service!;
  }
  async delete(id: string): Promise<void> {
    await this.serviceModel.findByIdAndDelete(id);
  }
}
