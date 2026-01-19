import { Inject } from "@nestjs/common";
import {
    CLIENT_REPOSITORY,
    type IClientRepository
} from "../../domain/repository/client-repository.interface";
import { Client } from "../../domain/entities/client.entity";
import { ResponseClientDto } from "../dto/response/response-client.dto";

export class GetAllClientUseCase {

    constructor(
        @Inject(CLIENT_REPOSITORY) private readonly clientRepository: IClientRepository
    ) { }

    async execute(): Promise<ResponseClientDto[]> {
        const clients = await this.clientRepository.findAll() as ResponseClientDto[];
        return clients.map(client => new ResponseClientDto(
            client.id,
            client.name,
            client.phone,
            client.address
        ));
    }

}