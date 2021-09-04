import { Controller, Param } from '@nestjs/common';
import { Body, Post, Get } from '@nestjs/common';

import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('id/:id')
    async findUserByID(@Param('id') id: string) {
        return await this.userService.findUserByID(id);
    }

    @Get('name/:username')
    async findUserByName(@Param('username') username: string) {
        return await this.userService.findUserByName(username);
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }
}
