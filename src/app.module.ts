import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServicesModule } from './app/services/api/services.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './app/user/api/user.module';
import { HashModule } from './lib/hash/hash.module';
import { AuthModule } from './app/auth/api/auth.module';
import { JsonWebTModule } from './lib/json-web-t/json-web-t.module';
import { JwtModule } from '@nestjs/jwt';
import { WashingModule } from './app/washing/api/washing.module';
import { ClientModule } from './app/client/api/client.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL as string),
    ServicesModule,
    UserModule,
    HashModule,
    AuthModule,
    JsonWebTModule,
    JwtModule,
    WashingModule,
    ClientModule,
  ],
})
export class AppModule {}
