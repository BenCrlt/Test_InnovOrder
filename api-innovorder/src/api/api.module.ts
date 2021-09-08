import { CacheModule, Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    CacheModule.register()
  ],
  providers: [ApiService],
  controllers: [ApiController]
})
export class ApiModule {}
