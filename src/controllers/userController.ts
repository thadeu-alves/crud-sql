import { FastifyReply, FastifyRequest } from "fastify";
import {
    IUserService,
    UserService,
} from "../services/userService";

export class UserController {
    private userService: IUserService;

    constructor(userService: IUserService) {
        this.userService = userService;
    }

    getAllUsers = async (
        request: FastifyRequest,
        reply: FastifyReply
    ) => {
        try {
            const data = await this.userService.getAll();

            reply.send({ data });
        } catch (err) {
            console.log(err);
            reply
                .status(500)
                .send({ error: "Internal Server Error" });
        }
    };
}
