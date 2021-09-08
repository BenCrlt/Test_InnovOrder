import { UserStub } from "../../user/user.stub";

const token = {
    access_token: '1'
}
const AuthService = jest.fn().mockReturnValue({
    register: jest.fn().mockResolvedValue(UserStub()),
    validateUser: jest.fn().mockReturnValue(UserStub()),
    login: jest.fn().mockReturnValue(token)
})