import {
    beforeEach,
    describe,
    expect,
    it,
    vi,
} from "vitest";
import { IUserService, UserService } from "./userService";
import { IUserModel } from "../models/userModel";
import { Database } from "../data";

describe("User Service Test", () => {
    let userService: IUserService;
    const mock: IUserModel[] = [
        {
            name: "string",
            id: "string",
            email: "string",
            age: 99,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];

    beforeEach(() => {
        const db = new Database();
        userService = new UserService(db);
        userService.setData(mock);
    });

    it("should return all users", async () => {
        const result = await userService.getAll();

        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBeGreaterThan(0);
        expect(result).toEqual(mock);

        const user = result[0];
        expect(user).toHaveProperty("name");
        expect(user).toHaveProperty("email");
        expect(user).toHaveProperty("id");
        expect(user).toHaveProperty("createdAt");
        expect(user).toHaveProperty("updatedAt");
    });

    it("should return user in correct type", async () => {
        const result = await userService.getAll();

        result.forEach((user) => {
            expect(user.id).toBeTypeOf("string");
            expect(user.name).toBeTypeOf("string");
            expect(user.email).toBeTypeOf("string");
            expect(user.age).toBeTypeOf("number");
            expect(user.createdAt).toBeInstanceOf(Date);
            expect(user.updatedAt).toBeInstanceOf(Date);
        });
    });
});
