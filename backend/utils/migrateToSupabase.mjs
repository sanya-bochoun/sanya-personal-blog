import { supabase, testSupabaseConnection } from './supabase.mjs';
import { query, testConnection as testPostgresConnection } from './db.mjs';

const migrateTable = async (tableName) => {
  try {
    console.log(`[${tableName}] 📦 Starting migration...`);
    
    const { rows } = await query(`SELECT * FROM ${tableName}`);
    
    if (rows.length === 0) {
      console.log(`[${tableName}] 텅 비어있음, 건너뜁니다.`);
      return true;
    }
    
    console.log(`[${tableName}] Found ${rows.length} rows to migrate.`);
    
    const { error } = await supabase.from(tableName).insert(rows, { upsert: true });
    
    if (error) {
      console.error(`[${tableName}] ❌ Migration failed:`, error.message);
      // Log more details
      if (error.details) console.error(`Details: ${error.details}`);
      if (error.hint) console.error(`Hint: ${error.hint}`);
      return false;
    }
    
    console.log(`[${tableName}] ✅ Successfully migrated ${rows.length} rows.`);
    return true;
  } catch (err) {
    console.error(`[${tableName}] ❌ A critical error occurred:`, err);
    return false;
  }
};

export const runMigration = async () => {
  console.log('--- 🚀 Starting Full Data Migration ---');
  
  console.log('\nStep 1: Verifying database connections...');
  const pgConnected = await testPostgresConnection();
  if (!pgConnected) {
    console.error('❌ PostgreSQL connection failed. Aborting.');
    return;
  }
  const supabaseConnected = await testSupabaseConnection();
  if (!supabaseConnected) {
    console.error('❌ Supabase connection failed. Aborting.');
    return;
  }
  console.log('✅ Both database connections are active.\n');
  
  const tables = [
    'users', 
    'categories', 
    'tags', 
    'posts', 
    'post_tags', 
    'comments',
    // Add other tables in order of dependency
  ];
  
  for (const table of tables) {
    const success = await migrateTable(table);
    if (!success) {
      console.error(`Migration stopped due to an error in table: ${table}.`);
      return;
    }
  }
  
  console.log('\n--- 🎉 All tables migrated successfully! ---');
};

// Auto-run if executed directly
if (import.meta.url.startsWith('file:')) {
  const modulePath = new URL(import.meta.url).pathname;
  if (process.argv[1] === modulePath) {
    runMigration();
  }
} 