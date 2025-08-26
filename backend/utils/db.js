import dotenv from "dotenv";
dotenv.config();
import pg from 'pg';
const { Pool } = pg;

let pool;

const connectDB = async () => {
  try {
    pool = new Pool({
      connectionString: process.env.DB_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    console.log("Connecting to PostgreSQL...");
    
    const client = await pool.connect();
    client.release();
    console.log("Connected to database");
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

connectDB();

export { pool };