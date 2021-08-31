import { Controller, Param } from '@nestjs/common';
import { Body, Post, Get } from '@nestjs/common';

import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':id')
    async findUserByID(@Param('id') id: string) {
        return await this.userService.findUserByID(id);
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }
}
