import { Controller } from '@nestjs/common';
import { Body, Post } from '@nestjs/common';

import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }
}
