import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user/user';

@Module({
  imports: [TypeOrmModule.forFeature([User])],  // 💡 THIS is the key line!
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
