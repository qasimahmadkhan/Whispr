import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user/user';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser (CreateUserDto: CreateUserDto): Promise<User>{
    const user = this.userRepository.create(CreateUserDto);
    return await this.userRepository.save(user);
  }

  findAll(){
    return this.userRepository.find();
  }
}
