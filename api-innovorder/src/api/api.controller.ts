import { Controller, UseGuards, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
    constructor(private readonly apiService: ApiService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get(':barcode')
    async getProduct(@Param('barcode') barcode : string) {
        return await this.apiService.getProduct(barcode)
    }
}
