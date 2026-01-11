import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateServiceUseCase } from '../application/use-case/create-service.use-case';
import { CreateServiceDto } from '../application/dto/request/create-service.dto';
import { FindServiceUseCase } from '../application/use-case/find-service.use-case';
import { FindServicePrivateUseCase } from '../application/use-case/find-service-private.use-case';
import { UpdateServiceDto } from '../application/dto/request/update-service.dto';
import { UpdateServiceUseCase } from '../application/use-case/update-service.use-case';

@Controller('services')
export class ServicesController {
  constructor(
    private readonly createServiceUseCase: CreateServiceUseCase,
    private readonly findServiceUseCase: FindServiceUseCase,
    private readonly findServicePrivateUseCase: FindServicePrivateUseCase,
    private readonly updateServiceUseCase: UpdateServiceUseCase,
  ) {}

  @Post()
  async createService(@Body() createServiceDto: CreateServiceDto) {
    await this.createServiceUseCase.execute(createServiceDto);
    return 'Servicio creado correctamente';
  }

  @Get('public')
  async findServices() {
    return await this.findServiceUseCase.execute();
  }

  @Get()
  async findServicesPrivate() {
    return await this.findServicePrivateUseCase.execute();
  }

  @Put(':id')
  async updateService(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return await this.updateServiceUseCase.execute(id, updateServiceDto);
  }
}
