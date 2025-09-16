import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/userController";

const userController = new UserController();

export default async function userRoutes(
    app: FastifyInstance
) {
    app.get("/users", userController.getAllUsers);
}
