import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JsonWebTService } from 'src/lib/json-web-t/json-web-t.service';

interface AuthenticatedRequest extends Request {
  user?: { id: string; email: string; name: string };
}

@Injectable()
export class AuthGuardGuard implements CanActivate {
  constructor(private readonly jsonWebTService: JsonWebTService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const access_token = request.cookies?.access_token as string | undefined;

    if (!access_token) {
      throw new UnauthorizedException('No autenticado');
    }

    try {
      // Validar el token JWT
      const payload = await this.jsonWebTService.verify(access_token);

      // Agregar el payload del token al request para uso en controladores
      request.user = payload;

      return true;
    } catch {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
