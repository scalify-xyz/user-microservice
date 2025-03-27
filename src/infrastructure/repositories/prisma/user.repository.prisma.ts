import { UserEntity } from "@domain/entity/user.entity";

import { UserModel } from "@infrastructure/models/user.model";
import { SaveDTO, SaveResponseDTO } from "@infrastructure/repositories/interfaces/user.interface.repository";


export class UserRepository {
    private constructor(
        private readonly userModel: UserModel,
    ) { }

    public static create(userModel: UserModel) {
        return new UserRepository(userModel);
    }

    public async save({ name, email, password }: SaveDTO) {
        const user = UserEntity.create({ name, email, password });
        // await this.userModel.user.create({
        //     data: {
        //         id: user.id,
        //         name: user.name,
        //         email: user.email,
        //         password: user.password,
        //         isEmailVerified: user.isEmailVerified,
        //     },
        // });

        return user;
    }

    public async findByEmail(email: string) {
        const user = await this.userModel.user.findFirst({ where: { email } });
        if (!user?.id) {
            return null;
        }

        return UserEntity.create({ id: user.id, name: user.name, email: user.email, password: user.password });
    }

    public async updatePassword(id: string, password: string): Promise<void> {
        await this.userModel.user.update({
            where: { id: id },
            data: { password },
        });
    }
}