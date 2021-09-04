import { Controller, Param } from '@nestjs/common';
import { Body, Post, Get } from '@nestjs/common';

import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
}
