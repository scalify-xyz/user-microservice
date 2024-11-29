export type UserProps = {
    id: string;
    name: string;
    email: string;
    password: string;
    isAccountConfirmed: boolean;
}

export class User {
    private constructor(private props: UserProps) {
        this.validate();
    }

    public static create(name: string, email: string, password: string) {
        return new User({ id: crypto.randomUUID().toString(), name, email, password, isAccountConfirmed: false });
    }

    public static with(props: UserProps) {
        return new User(props);
    }

    private validate() {
        // Add Email and Password Size Validation
    }

    public get id() {
        return this.props.name;
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

    public changePassword(newPassword: string) {
        this.props.password = newPassword;
    }
}