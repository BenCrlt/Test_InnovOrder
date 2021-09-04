import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import bcrypt from 'bcrypt'
import { LoginUserDto } from '../dto/login-user.dto';


@Injectable()
export class AuthService {
    constructor(private userService: UserService) {};

    async register(userInfo: CreateUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(userInfo.password, 10);
        try {
            const createdUser = await this.userService.create({...userInfo, password: hashedPassword})
            return createdUser;
        } catch(error) {
            throw new HttpException('User already exist in the base or error of connection', HttpStatus.BAD_REQUEST);
        }
    }

    async login(user: LoginUserDto): Promise<User> {
        try {
            const userFound = await this.userService.findUserByName(user.username);
            if (userFound) {
                await this.verifyPassword(user.password, userFound.password);
                return userFound;
            }
        } catch(error) {
            throw new HttpException("Invalid credentials provided", HttpStatus.BAD_REQUEST);
        }
        return
    }

    async verifyPassword(plainTextPassword: string, hashedPassword: string) {
        const isPasswordMatching = bcrypt.compare(
            plainTextPassword,
            hashedPassword
        );
        if (!isPasswordMatching) {
            throw new HttpException("Invalid credentials provided", HttpStatus.BAD_REQUEST);
        }
    }
 }
