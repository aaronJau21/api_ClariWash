import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../domain/entities/user.entity';
import { HashModule } from 'src/lib/hash/hash.module';
import { CreateUserUseCase } from '../application/use-case/create-user.use-case';
import { USER_REPOSITORY } from '../domain/repository/user-repository.interfce';
import { UserRepositoryMongo } from '../infrastructure/repository/mongo/user-repository.mongo';

@Module({
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    HashModule,
  ],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryMongo,
    },
    CreateUserUseCase,
  ],
})
export class UserModule {}
