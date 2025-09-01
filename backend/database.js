import dotenv from 'dotenv';
dotenv.config({ path: '.env.db' });

import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;
const sql = postgres(connectionString, { ssl: 'require' });

export default sql;