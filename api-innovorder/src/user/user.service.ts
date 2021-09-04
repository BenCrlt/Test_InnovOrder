import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

    async findUserByID(id: string): Promise<User> {
        return await this.model.findById(id).exec();
    }

    async findUserByName(username: string): Promise<User> {
        return await this.model.findOne({ username: username}).exec();
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        return await new this.model({
            ...createUserDto
        }).save();
    }
}
