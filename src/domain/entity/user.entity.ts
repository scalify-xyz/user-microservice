export type IUser = {
    id: string;
    name: string;
    email: string;
    password: string;
    isAccountConfirmed: boolean;
}

export type IUserWithoutIdAndConfirmed = Omit<IUser, "id" | "isAccountConfirmed"> & { 
    id?: string;
    isAccountConfirmed?: boolean;
};

export class User {
    private constructor(private props: IUser) {
        this.props.id = props.id;
        this.props.name = props.name;
        this.props.email = props.email;
        this.props.password = props.password;
        this.props.isAccountConfirmed = props.isAccountConfirmed;
    }

    public static create({ id, name, email, password }: IUserWithoutIdAndConfirmed) {
        return new User({ id: id || crypto.randomUUID().toString(), name, email, password, isAccountConfirmed: false });
    }

    public static with(props: IUser) {
        return new User(props);
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

    public get isAccountConfirmed() {
        return this.props.isAccountConfirmed;
    }
}