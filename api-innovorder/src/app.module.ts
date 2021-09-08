import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ApiModule } from './api/api.module';
import { CacheModule } from '@nestjs/common';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ApiModule,
    MongooseModule.forRoot("mongodb://localhost:27017/Innovorder"),
    CacheModule.register()
  ]
})
export class AppModule {}
