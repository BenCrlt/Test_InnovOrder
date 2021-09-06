import { ProductStub } from "../api.stubs";

export const ApiService = jest.fn().mockReturnValue({
    getProduct: jest.fn().mockResolvedValue(ProductStub())
})