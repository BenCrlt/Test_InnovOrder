import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';
import { User } from '../schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
@Module({
  imports: [
    UserModule,
    PassportModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema}])
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy],
})
export class AuthModule {}
