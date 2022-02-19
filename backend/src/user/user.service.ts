import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Inject, Injectable, Req, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(REQUEST) private readonly request: Request,
    private jwtService: JwtService
  ) {}

  async create(dto: CreateUserDto) {
    const user = await this.userModel.create(dto);

    console.log(user);
    return user;
  }

  async getAll() {
    const users = await this.userModel.find();
    return users;
  }

  async getByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async getMe() {
    const authHeader = this.request.headers.authorization;
    const token = authHeader.split(' ')[1];

    const { iat, exp, ...userData } = await this.jwtService.verifyAsync(token);

    return userData;
  }
}
