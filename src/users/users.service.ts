import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user/user';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { loginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  
  async login(loginDto: loginUserDto){
    const user = await this.userRepository.findOne({where:{email:loginDto.email}});
    if(!user){
      throw new UnauthorizedException("No user Found")
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if(!isPasswordValid){
      throw new UnauthorizedException('Invalid Credentials')
    }
    return user;
  }

  async createUser (CreateUserDto: CreateUserDto): Promise<User>{
    const existingUser = await this.userRepository.findOne({where: {email:CreateUserDto.email}});
    if(existingUser){
      throw new BadRequestException('Email already in use');
    }
    const hashedPassword = await bcrypt.hash(CreateUserDto.password,10);
    const user = this.userRepository.create({
      ...CreateUserDto,
      password:hashedPassword,
    });
    return await this.userRepository.save(user);
  }

  findAll(){
    return this.userRepository.find();
  }
  
  findOne(id:number){
    const user =  this.userRepository.findOne({where: {id}});
    if(!user){
        throw new NotFoundException(`User with the ${id} does not exist`)
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
  
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
  
    const updatedUser = Object.assign(user, updateUserDto);
    return await this.userRepository.save(updatedUser);
  }

  async delete(id:number){
    const user = await this.userRepository.findOne({where:{id}});
    return await this.userRepository.delete(id);
  }
  
}
