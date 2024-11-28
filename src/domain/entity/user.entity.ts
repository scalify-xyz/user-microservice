export type UserProps = {
    id: string;
    name: string;
    email: string;
    password: string;
    hasUSerConfirmation: boolean;
}

export class User {
    private constructor(private props: UserProps) {
        this.props.id = props.id;
        this.props.name = props.name;
        this.props.email = props.email;
        this.props.password = props.password;
        this.props.hasUSerConfirmation = props.hasUSerConfirmation;

        this.validate();
    }

    public static create(name: string, email: string, password: string) {
        return new User({ id: crypto.randomUUID().toString(), name, email, password, hasUSerConfirmation: false });
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

    public changePassword(newPassword: string) {
        this.props.password = newPassword;
    }
}