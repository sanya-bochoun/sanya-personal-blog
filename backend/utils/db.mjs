import pg from 'pg';

const { Pool } = pg;

// Debug log
console.log('DB_USER:', process.env.DB_USER, typeof process.env.DB_USER);
console.log('DB_HOST:', process.env.DB_HOST, typeof process.env.DB_HOST);
console.log('DB_NAME:', process.env.DB_NAME, typeof process.env.DB_NAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD, typeof process.env.DB_PASSWORD);
console.log('DB_PORT:', process.env.DB_PORT, typeof process.env.DB_PORT);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASSWORD),
  port: Number(process.env.DB_PORT),
  ssl: { rejectUnauthorized: false }
});

export const query = (text, params) => pool.query(text, params);

export const testConnection = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();
    console.log('✅ Successfully connected to PostgreSQL database!');
    console.log('Current database time:', result.rows[0].now);
    return true;
  } catch (error) {
    console.error('❌ Error connecting to the database:', error.message);
    return false;
  }
};

// Export connection pool
export default pool; 