import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/app/user/api/user.module';
import { LoginUseCase } from '../application/use-case/login.use-case';
import { HashModule } from 'src/lib/hash/hash.module';

@Module({
  controllers: [AuthController],
  imports: [UserModule, HashModule],
  providers: [LoginUseCase],
})
export class AuthModule {}
