import { HttpModule, HttpService } from '@nestjs/axios';
import { CacheModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { ProductStub } from './api.stubs'

jest.mock('./api.service')

describe('ApiController', () => {
  let apiController: ApiController;
  let apiService: ApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        CacheModule.register()
      ],
      controllers: [ApiController],
      providers: [ApiService]
    }).compile();

    apiController = module.get<ApiController>(ApiController);
    apiService = module.get<ApiService>(ApiService);
    jest.clearAllMocks();
  });

  describe('getProduct', () => {
     let product;
     describe('when get product is called', () => {
       beforeEach(async () => {
         product = await apiController.getProduct(ProductStub().barcode)
       })

       test("it should call the api service", () => {
          expect(apiService.getProduct).toBeCalledWith(ProductStub().barcode);
       })

       test("it should return a product", () => {
         expect(product).toEqual(ProductStub());
       }) 
     })
  })
});
