import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'El email no es válido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;

  @IsString({ message: 'La contraseña debe ser un string' })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  password: string;
}
