import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/app/user/application/dto/request/create-user.dto';
import { UpdateUserDto } from 'src/app/user/application/dto/request/update-user.dto';
import { User } from 'src/app/user/domain/entities/user.entity';
import { IUserRepository } from 'src/app/user/domain/repository/user-repository.interfce';

export class UserRepositoryMongo implements IUserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    return user!;
  }
  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }
  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    return user!;
  }
  async create(data: CreateUserDto): Promise<User> {
    const user = await this.userModel.create(data);
    return await user.save();
  }
  async update(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return user!;
  }
  async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id);
  }
}
