import { config } from "dotenv";
import { Pool, PoolConfig, QueryResult } from "pg";

config();

export interface DatabaseConfig extends PoolConfig {
    host: string;
    user: string;
    password: string;
    database: string;
    port: number;
}

const dbConfig: DatabaseConfig = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "docker",
    password: process.env.DB_PASSWORD || "docker",
    database: process.env.DB_NAME || "crud",
    port: parseInt(process.env.DB_PORT || "5432"),
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
};

class Database {
    private pool: Pool;

    constructor() {
        this.pool = new Pool(dbConfig);

        this.pool.on("error", (err: Error) => {
            console.error(
                "Unexpected error on idle client",
                err
            );
            process.exit(-1);
        });

        this.pool.on("connect", () => {
            console.log("Connected to PostgreSQL database");
        });
    }

    async getClient() {
        try {
            const client = await this.pool.connect();
            return client;
        } catch (error) {
            console.error(
                "Error getting database client:",
                error
            );
            throw error;
        }
    }

    async query<T = any>(
        sql: string,
        params?: any[]
    ): Promise<T[]> {
        const client = await this.getClient();
        try {
            const result: QueryResult = await client.query(
                sql,
                params
            );
            return result.rows as T[];
        } catch (error) {
            console.error("Database query error:", error);
            throw error;
        } finally {
            client.release();
        }
    }

    async queryOne<T = any>(
        sql: string,
        params?: any[]
    ): Promise<T | null> {
        const results = await this.query<T>(sql, params);
        return results[0] || null;
    }

    async transaction<T>(
        callback: (client: any) => Promise<T>
    ): Promise<T> {
        const client = await this.getClient();
        try {
            await client.query("BEGIN");
            const result = await callback(client);
            await client.query("COMMIT");
            return result;
        } catch (error) {
            await client.query("ROLLBACK");
            throw error;
        } finally {
            client.release();
        }
    }

    async close(): Promise<void> {
        await this.pool.end();
        console.log("Database connection closed");
    }

    async testConnection(): Promise<boolean> {
        try {
            const result = await this.query(
                "SELECT NOW() as current_time"
            );
            console.log(
                "Database connection test successful:",
                result[0]
            );
            return true;
        } catch (error) {
            console.error(
                "Database connection test failed:",
                error
            );
            return false;
        }
    }
}

export const db = new Database();
