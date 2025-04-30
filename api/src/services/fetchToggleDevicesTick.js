import mysql from "mysql2/promise";
import dotenv from 'dotenv';

dotenv.config();
const DB_REQUEST = "SELECT url FROM toggle_devices;"
const ABORT_SIGNAL_TIMEOUT = 1000;

const pinch = async (url) => {
    try {
        //const res = 
	await fetch(`${url}/relay`, { signal: AbortSignal.timeout(ABORT_SIGNAL_TIMEOUT) });
        //const data = await res.json();
        // console.log(data);
    } catch (error) {
        // console.log(error.message);
    }
}

export default async (period) => {
    const db = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
    });
    const [rows] = await db.execute(DB_REQUEST);
    const urls = rows.map(r => r.url)
    urls.map(async u => await pinch(u));
    setInterval(() => {
        urls.map(async u => await pinch(u));
    }, period);
}
