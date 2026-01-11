import { GlobalRepository } from 'src/shared/repository/global-repository.interface';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../../application/dto/request/create-user.dto';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface IUserRepository extends GlobalRepository<User, CreateUserDto> {
  findByEmail(email: string): Promise<User | null>;
}
