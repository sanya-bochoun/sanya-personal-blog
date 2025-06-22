import { query, testConnection } from './db.mjs';

const testPgQuery = async () => {
  console.log('--- Testing PostgreSQL Connection and Query ---');

  const isConnected = await testConnection();
  if (!isConnected) {
    console.log('--- Test Failed: Could not connect to PostgreSQL. ---');
    return;
  }

  try {
    console.log('Querying "users" table...');
    const usersResult = await query('SELECT * FROM users LIMIT 5');
    console.log(`Query successful. Found ${usersResult.rowCount} users.`);
    console.log('Sample data:', usersResult.rows);

    console.log('\nQuerying "categories" table...');
    const catResult = await query('SELECT * FROM categories LIMIT 5');
    console.log(`Query successful. Found ${catResult.rowCount} categories.`);
    console.log('Sample data:', catResult.rows);

    console.log('\n--- Test Completed Successfully ---');
  } catch (error) {
    console.error('\n--- An error occurred during query test ---');
    console.error(error);
  }
};

testPgQuery(); 