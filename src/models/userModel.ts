export interface IUserModel {
    name: string;
    id: string;
    email: string;
    age: number;
    createdAt: Date;
    updatedAt: Date;
}

export class UserModel {
    private props: IUserModel;

    constructor(props: IUserModel) {
        this.props = props;
    }

    getName() {
        return this.props.name;
    }

    getId() {
        return this.props.id;
    }

    getEmail() {
        return this.props.email;
    }

    getAge() {
        return this.props.age;
    }

    getProps() {
        return this.props;
    }
}
