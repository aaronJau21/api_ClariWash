import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClientDto } from 'src/app/client/application/dto/request/create-client.dto';
import { UpdateClientDto } from 'src/app/client/application/dto/request/update-client.dto';
import { Client } from 'src/app/client/domain/entities/client.entity';
import { IClientRepository } from 'src/app/client/domain/repository/client-repository.interface';

export class ClientRepositoryMongo implements IClientRepository {
  constructor(
    @InjectModel(Client.name) private readonly clientModel: Model<Client>,
  ) { }

  async findByPhone(phone: string): Promise<Client | null> {
    const client = await this.clientModel.findOne({ phone });
    return client || null;
  }

  async findAll(): Promise<Client[]> {
    const clients = await this.clientModel.find();
    return clients;
  }
  findOne(id: string): Promise<Client> {
    throw new Error('Method not implemented.');
  }
  async create(data: CreateClientDto): Promise<Client> {
    const client = await this.clientModel.create(data);
    return client.save();
  }
  update(id: string, data: UpdateClientDto): Promise<Client> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
