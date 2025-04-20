import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserRepository } from '../../../../application/interfaces/user.repository.interface';
import { User } from '../../../../domain/entities/user.entity';
import { UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '@/core/application/dtos/auth.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async create(registerDto: RegisterDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const createdUser = new this.userModel({
      ...registerDto,
      password: hashedPassword,
    });
    const savedUser = await createdUser.save();
    return this.toDomainEntity(savedUser);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).exec();
    return user ? this.toDomainEntity(user) : null;
  }

  async findOne(query: any): Promise<User | null> {
    const user = await this.userModel.findOne(query).exec();
    return user ? this.toDomainEntity(user) : null;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id).exec();
    return user ? this.toDomainEntity(user) : null;
  }

  async update(id: string, updateData: Partial<User>): Promise<User> {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    if (!updatedUser) {
      throw new Error(`User with id ${id} not found`);
    }
    return this.toDomainEntity(updatedUser);
  }

  async delete(id: string): Promise<void> {
    const result = await this.userModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new Error(`User with id ${id} not found`);
    }
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users.map(user => this.toDomainEntity(user));
  }

  private toDomainEntity(userDocument: UserDocument): User {
    const user = new User({
      id: userDocument._id.toString(),
      email: userDocument.email,
      password: userDocument.password,
      username: userDocument.username,
      fullName: userDocument.fullName,
      avatar: userDocument.avatar,
      role: userDocument.role,
      settings: userDocument.settings,
      isActive: userDocument.isActive,
      lastLogin: userDocument.lastLogin,
      createdAt: userDocument.get('createdAt'),
      updatedAt: userDocument.get('updatedAt'),
    });
    return user;
  }
} 