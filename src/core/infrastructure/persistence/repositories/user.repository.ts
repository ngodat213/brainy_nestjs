import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserRepository } from '../../../application/interfaces/user.repository.interface';
import { User, UserDocument } from '../../../domain/entities/user.entity';
import { RegisterDto } from '../../../application/dtos/auth.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(registerDto: RegisterDto): Promise<User> {
    const user = await this.userModel.create(registerDto);
    return this.toEntity(user);
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users.map(this.toEntity);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      return null;
    }
    return this.toEntity(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      return null;
    }
    return this.toEntity(user);
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true },
    ).exec();
    if (!user) {
      throw new Error('User not found');
    }
    return this.toEntity(user);
  }

  async delete(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new Error('User not found');
    }
  }

  private toEntity(user: UserDocument): User {
    const userInstance = new User();
    Object.assign(userInstance, {
      id: user._id.toString(),
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      isActive: user.isActive,
      lastLogin: user.lastLogin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
    return userInstance;
  }
} 