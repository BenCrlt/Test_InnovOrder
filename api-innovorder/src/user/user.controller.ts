import { Body, Controller, Delete, Param, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(@Param() params, @Body() updateUserDto:UpdateUserDto) {
        return await this.userService.update(params.id, updateUserDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async remove(@Param() params) {
        return await this.userService.remove(params.id);
    }
}
