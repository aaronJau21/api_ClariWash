import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JsonWebTService {
  constructor(private readonly jwtService: JwtService) {}

  async sign(payload: { id: string; email: string; name: string }) {
    const token = await this.jwtService.signAsync(payload);
    return token;
  }

  async verify(
    token: string,
  ): Promise<{ id: string; email: string; name: string }> {
    try {
      const payload = await this.jwtService.verifyAsync<{
        id: string;
        email: string;
        name: string;
      }>(token);
      return payload;
    } catch {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
