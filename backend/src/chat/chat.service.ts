import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMessageDTO } from './dto/create-message.dto';
import { Message, MessageDocument } from './schemas/message.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>
  ) {}

  async createMessage(dto: CreateMessageDTO) {
    const message = await this.messageModel.create(dto);
    return message;
  }

  async getMessages() {
    const messages = await this.messageModel.find();
    return messages;
  }
}
