import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import * as bcrypt from 'bcrypt';

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

    async update(idUser: string, updateUserDto: UpdateUserDto) : Promise<User> {
        let update = {};
        update = updateUserDto.username && {...update, username: updateUserDto.username};
        if (updateUserDto.password) {
            const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
            update = {...update, password: hashedPassword};
        }
        return await this.model.findByIdAndUpdate(idUser, update);
    }

    async remove(idUser: string) : Promise<User> {
        return await this.model.findByIdAndRemove(idUser);
    }
}
