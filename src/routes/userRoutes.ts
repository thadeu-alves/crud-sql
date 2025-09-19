import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/userController";
import { Database } from "../data";
import { UserService } from "../services/userService";

const db = new Database();
const userService = new UserService(db);
const userController = new UserController(userService);

export default async function userRoutes(
    app: FastifyInstance
) {
    app.get("/users", userController.getAllUsers);
}
