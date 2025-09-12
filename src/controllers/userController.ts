import { FastifyReply, FastifyRequest } from "fastify";
import { IUserService } from "../services/userService";

export class UserController {
    userService: IUserService;

    constructor(userService: IUserService) {
        this.userService = userService;
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
