import { registerAs } from '@nestjs/config';

export default registerAs('token', () => ({
  global: true,
  secret: process.env.SECRET_KEY,
  signOptions: {
    expiresIn: '1h',
  },
}));
