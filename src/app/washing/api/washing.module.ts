import { Module } from '@nestjs/common';
import { WashingController } from './washing.controller';

@Module({
  controllers: [WashingController],
})
export class WashingModule {}
