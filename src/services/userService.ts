import { Database } from "../data";
import { IUserModel } from "../models/userModel";

export interface IUserService {
    getAllUsers(): Promise<IUserModel[]>;
    getUserById(id: string): Promise<IUserModel>;
    createUser(
        name: string,
        email: string,
        age: number
    ): Promise<IUserModel>;
    updateUser(
        id: string,
        name: string,
        email: string,
        age: number
    ): Promise<IUserModel>;
    deleteUser(id: string): Promise<boolean>;
    userExists(email: string): Promise<boolean>;
}

export class UserService implements IUserService {
    private db;

    constructor() {
        this.db = new Database();
    }

    getAllUsers(): Promise<IUserModel[]> {
        throw new Error("Method not implemented.");
    }

    getUserById(id: string): Promise<IUserModel> {
        throw new Error("Method not implemented.");
    }

    createUser(
        name: string,
        email: string,
        age: number
    ): Promise<IUserModel> {
        throw new Error("Method not implemented.");
    }

    updateUser(
        id: string,
        name: string,
        email: string,
        age: number
    ): Promise<IUserModel> {
        throw new Error("Method not implemented.");
    }

    deleteUser(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    userExists(email: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
