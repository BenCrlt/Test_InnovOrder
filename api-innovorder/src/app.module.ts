import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ApiModule,
    MongooseModule.forRoot("mongodb://localhost:27017/Innovorder")
  ]
})
export class AppModule {}
