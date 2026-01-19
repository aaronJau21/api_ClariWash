import { PartialType } from '@nestjs/mapped-types';
import { CreateWashingDto } from './create-washing.dto';

export class UpdateWashingDto extends PartialType(CreateWashingDto) {}
