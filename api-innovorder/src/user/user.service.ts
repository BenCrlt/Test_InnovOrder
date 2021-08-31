import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserSchema } from 'src/schemas/user.schema';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        return await new this.model({
            ...createUserDto
        }).save();
    }
}
