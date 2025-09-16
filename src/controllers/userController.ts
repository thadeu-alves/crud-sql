import { FastifyReply, FastifyRequest } from "fastify";
import {
    IUserService,
    UserService,
} from "../services/userService";

export class UserController {
    userService: IUserService;

    constructor() {
        this.userService = new UserService();
    }

    async getAllUsers(
        request: FastifyRequest,
        reply: FastifyReply
    ) {
        try {
            const data =
                await this.userService.getAllUsers();

            reply.send({ data });
        } catch (err) {
            console.log(err);
            reply.send({ error: "Internal Server Error" });
        }
    }
}
