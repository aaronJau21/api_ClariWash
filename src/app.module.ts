import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServicesModule } from './app/services/api/services.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './app/user/api/user.module';
import { HashModule } from './lib/hash/hash.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL as string),
    ServicesModule,
    UserModule,
    HashModule,
  ],
})
export class AppModule {}
