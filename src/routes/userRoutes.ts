import { FastifyInstance } from "fastify";

export default async function userRoutes(
    app: FastifyInstance
) {
    app.get("/users", () => {});
}
