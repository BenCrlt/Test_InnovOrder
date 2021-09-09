import { UserStub } from "../../user/user.stub";

export const token = {
    access_token: '1'
}
export const AuthService = jest.fn().mockReturnValue({
    register: jest.fn().mockResolvedValue(UserStub()),
    validateUser: jest.fn().mockReturnValue(UserStub()),
    login: jest.fn().mockResolvedValue(token)
}) 