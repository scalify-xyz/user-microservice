import { User } from "../../entity/user.entity";

export interface IUserGatewayRepository {
    save(user: User): Promise<void>;
    login(email: string, password: string): Promise<{ token: string; }>;
    changePassword(email: string, password: string): Promise<void>;
}