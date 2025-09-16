import { Database } from "../data";
import { IUserModel } from "../models/userModel";

export interface IUserService {
    getAll(): Promise<IUserModel[]>;
    getById(id: string): Promise<IUserModel>;
    create(
        name: string,
        email: string,
        age: number
    ): Promise<IUserModel>;
    update(
        id: string,
        name: string,
        email: string,
        age: number
    ): Promise<IUserModel>;
    delete(id: string): Promise<boolean>;
    exists(email: string): Promise<boolean>;
}

export class UserService implements IUserService {
    private db;
    private data: IUserModel[];

    constructor() {
        this.data = [];
        this.db = new Database();
    }

    async getAll(): Promise<IUserModel[]> {
        try {
            return Promise.resolve([
                {
                    name: "string",
                    id: "string",
                    email: "string",
                    age: 99,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ]);
        } catch (err) {
            console.log(err);
            throw new Error("Failed to load data.");
        }
    }

    getById(id: string): Promise<IUserModel> {
        throw new Error("Method not implemented.");
    }

    create(
        name: string,
        email: string,
        age: number
    ): Promise<IUserModel> {
        throw new Error("Method not implemented.");
    }

    update(
        id: string,
        name: string,
        email: string,
        age: number
    ): Promise<IUserModel> {
        throw new Error("Method not implemented.");
    }

    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    exists(email: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
