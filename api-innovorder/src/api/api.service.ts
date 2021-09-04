import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

const OPEN_FOOD_FACTS_API = "https://world.openfoodfacts.org/api/v0/product/"

@Injectable()
export class ApiService {
    constructor(private httpService: HttpService) {}
    
    async getProduct(barcode : string) {
        const fullAddress = OPEN_FOOD_FACTS_API + barcode + '.json';
        return this.httpService.get(fullAddress).pipe(
            map(response => response.data)
        );
    }
}
