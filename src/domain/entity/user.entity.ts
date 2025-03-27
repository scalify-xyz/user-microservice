export type IUser = {
    id: string;
    name: string;
    email: string;
    password: string;
    isEmailVerified: boolean;
}

export type IUserWithoutIdAndConfirmed = Omit<IUser, "id" | "isEmailVerified"> & { 
    id?: string;
    isEmailVerified?: boolean;
};

export class UserEntity {
    private constructor(private props: IUser) {
        this.props.id = props.id;
        this.props.name = props.name;
        this.props.email = props.email;
        this.props.password = props.password;
        this.props.isEmailVerified = props.isEmailVerified;
    }

    public static create({ id, name, email, password }: IUserWithoutIdAndConfirmed) {     
        return new UserEntity({ id: id || crypto.randomUUID().toString(), name, email, password, isEmailVerified: false });
    }

    public static with(props: IUser) {
        return new UserEntity(props);
    }

    public get id() {
        return this.props.id;
    }

    public get name() {
        return this.props.name;
    }

    public get email() {
        return this.props.email;
    }

    public get password() {
        return this.props.password;
    }

    public get isEmailVerified() {
        return this.props.isEmailVerified;
    }
}