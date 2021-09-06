export const ApiService = jest.fn().mockReturnValue({
    getProduct: jest.fn().mockResolvedValue("Product found")
})