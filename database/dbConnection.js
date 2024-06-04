import mysql from "mysql2";
import dotenv from "dotenv";

//connecting config file to dbConnection file
dotenv.config({ path: './config.env' });

//creating pool connection using info from config
export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}).promise();