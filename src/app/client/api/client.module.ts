import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from '../domain/entities/client.entity';
import { CLIENT_REPOSITORY } from '../domain/repository/client-repository.interface';
import { ClientRepositoryMongo } from '../infrastructure/repository/mongo/client-repository.mongo';
import { CreateClientUseCase } from '../application/use-case/create-client.use-case';
import { GetAllClientUseCase } from '../application/use-case/get-all-client.use-case';

@Module({
  controllers: [ClientController],
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
  ],
  providers: [
    {
      provide: CLIENT_REPOSITORY,
      useClass: ClientRepositoryMongo,
    },
    CreateClientUseCase,
    GetAllClientUseCase,
  ],
})
export class ClientModule { }
