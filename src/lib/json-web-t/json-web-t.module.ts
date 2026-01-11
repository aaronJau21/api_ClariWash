import { Module } from '@nestjs/common';
import { JsonWebTService } from './json-web-t.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import tokenConfig from './token.config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';

@Module({
  providers: [JsonWebTService],
  imports: [
    ConfigModule.forFeature(tokenConfig),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        config.get('token') as JwtModuleOptions,
    }),
  ],
  exports: [JsonWebTService],
})
export class JsonWebTModule {}
