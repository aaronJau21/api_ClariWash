import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/app/user/api/user.module';
import { LoginUseCase } from '../application/use-case/login.use-case';
import { HashModule } from 'src/lib/hash/hash.module';
import { JsonWebTModule } from 'src/lib/json-web-t/json-web-t.module';

@Module({
  controllers: [AuthController],
  imports: [UserModule, HashModule, JsonWebTModule],
  providers: [LoginUseCase],
})
export class AuthModule {}
