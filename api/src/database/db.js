import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

let pool = null;

export const createBDPool = async () => {
    if (pool) return pull;

    try {
        pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });

        const connection = await pool.getConnection();
        connection.release();
        console.log("Connected to database");
        return pool;
    } catch (error) {
        console.log("Error connecting to database", error);
        throw error;
    }
}

export const getDbPool = () => {
    if (!pool) {
        throw new Error("Database connection pool not initialized");
    }
    return pool;
};