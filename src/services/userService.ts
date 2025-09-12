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
