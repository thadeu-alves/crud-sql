import { Database } from "../data";
import { IUserModel } from "../models/userModel";

export interface IUserService {
    setData(data: IUserModel[]): void;
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

    constructor(db: Database) {
        this.data = [];
        this.db = db;
    }

    setData(data: IUserModel[]): void {
        this.data = data;
    }

    async getAll(): Promise<IUserModel[]> {
        try {
            return Promise.resolve(this.data);
        } catch (err) {
            console.log(err);
            throw new Error("Failed to load data.");
        }
    }

    async getById(id: string): Promise<IUserModel> {
        try {
            if (!this.data) {
                this.data = await this.getAll();
            }

            const user = this.data.find(
                (user) => user.id == id
            );

            if (!user) {
                throw new Error("User not finded.");
            }

            return Promise.resolve(user || null);
        } catch (err) {
            console.log(err);
            throw new Error("Failed to get User.");
        }
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
