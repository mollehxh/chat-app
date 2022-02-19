import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ChatController } from './chat/chat.controller';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-chat'),
    UserModule,
    AuthModule,
    ChatModule,
  ],
  controllers: [],
  providers: [ChatModule, AuthModule, UserModule],
})
export class AppModule {}
