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
            name: "name",
            id: "id",
            email: "email",
            age: 99,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];

    beforeEach(() => {
        const db = new Database();
        userService = new UserService(db);
        userService.setData(mock);

        vi.spyOn(userService, "getAll");
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

    it("should return user correct", async () => {
        const result = await userService.getById("id");

        expect(result).toEqual(mock[0]);
        expect(userService.getAll).not.toHaveBeenCalled();
        expect(result?.id).toBeTypeOf("string");
        expect(result?.name).toBeTypeOf("string");
        expect(result?.email).toBeTypeOf("string");
        expect(result?.age).toBeTypeOf("number");
        expect(result?.createdAt).toBeInstanceOf(Date);
        expect(result?.updatedAt).toBeInstanceOf(Date);

        await expect(
            userService.getById("0")
        ).rejects.toThrow("Failed to get User.");
    });
});
