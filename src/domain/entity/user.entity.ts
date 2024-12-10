export type UserProps = {
    id: string;
    name: string;
    email: string;
    password: string;
    isAccountConfirmed: boolean;
}

export type UserLoginDto = (email: string, password: string) => void;

export class User {
    private constructor(private props: UserProps) {
        this.props.id = props.id;
        this.props.name = props.name;
        this.props.email = props.email;
        this.props.password = props.password;
        this.props.isAccountConfirmed = props.isAccountConfirmed;
    }

    public static create(name: string, email: string, password: string) {
        return new User({ id: crypto.randomUUID().toString(), name, email, password, isAccountConfirmed: false });
    }

    public static with(props: UserProps) {
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