import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user/user';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { loginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Post('login')
    login(@Body() loginUserDto: loginUserDto){
        return this.userService.login(loginUserDto);
    }

    @Post()
    async create(@Body() CreateUserDto: CreateUserDto): Promise<User>{
        return this.userService.createUser(CreateUserDto);
    }

    @Get()
    findAll(){
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id:string){
        return this.userService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id:string, @Body() UpdateUserDto:UpdateUserDto){
        return this.userService.update(+id, UpdateUserDto);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.userService.delete(+id);
    }

    


}
