import pg from 'pg';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const { Pool } = pg;

const setupDB = async () => {
    console.log("Setting up DB");
    const pool = new Pool({
        connectionString: process.env.DB_URL,
        ssl:{
            rejectUnauthorized: false,
        },
    });

    try{
        const schema = fs.readFileSync('./db/schema.sql').toString();
        await pool.query(schema);
        console.log("DB setup complete");
    }
    catch(err){
        console.error("Error setting up DB", err);
    }
    finally{
        await pool.end();
    }
}

setupDB();