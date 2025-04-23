import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user/user';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Post()
    async create(@Body() CreateUserDto: CreateUserDto): Promise<User>{
        return this.userService.createUser(CreateUserDto);
    }

    @Get()
    findAll(){
        return this.userService.findAll();
    }
}
