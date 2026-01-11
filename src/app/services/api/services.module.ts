import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Service, ServiceSchema } from '../domain/entities/service.entity';
import { SERVICE_REPOSITORY } from '../domain/repository/service-repository.interface';
import { ServiceRepositoryMongo } from '../infrastructure/repository/mongo/service-repository.mongo';
import { CreateServiceUseCase } from '../application/use-case/create-service.use-case';
import { FindServiceUseCase } from '../application/use-case/find-service.use-case';
import { FindServicePrivateUseCase } from '../application/use-case/find-service-private.use-case';
import { UpdateServiceUseCase } from '../application/use-case/update-service.use-case';
import { JsonWebTModule } from 'src/lib/json-web-t/json-web-t.module';
import { AuthGuardGuard } from 'src/guard/auth-guard/auth-guard.guard';

@Module({
  controllers: [ServicesController],
  imports: [
    MongooseModule.forFeature([{ name: Service.name, schema: ServiceSchema }]),
    JsonWebTModule,
  ],
  providers: [
    {
      provide: SERVICE_REPOSITORY,
      useClass: ServiceRepositoryMongo,
    },
    CreateServiceUseCase,
    FindServiceUseCase,
    FindServicePrivateUseCase,
    UpdateServiceUseCase,
    AuthGuardGuard,
  ],
})
export class ServicesModule {}
