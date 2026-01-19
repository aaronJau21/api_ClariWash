import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateClientUseCase } from '../application/use-case/create-client.use-case';
import { CreateClientDto } from '../application/dto/request/create-client.dto';
import { GetAllClientUseCase } from '../application/use-case/get-all-client.use-case';

@Controller('clients')
export class ClientController {
    constructor(
        private readonly createClientUseCase: CreateClientUseCase,
        private readonly getAllClientUseCase: GetAllClientUseCase,
    ) { }

    @Post()
    async createClient(@Body() createClientDto: CreateClientDto) {
        return await this.createClientUseCase.execute(createClientDto);
    }

    @Get()
    async getClients() {
        return await this.getAllClientUseCase.execute();
    }

}
