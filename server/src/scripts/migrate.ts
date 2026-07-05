import { pool } from '../config/database.ts';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigration() {
  const client = await pool.connect();
  try {
    console.log('🔄 Running database migration...');
    
    // Read the SQL file - now using correct path
    const sqlPath = path.join(__dirname, '../../database.sql');
    console.log(`📂 Reading SQL file from: ${sqlPath}`);
    
    // Check if file exists
    if (!fs.existsSync(sqlPath)) {
      console.error(`❌ SQL file not found at: ${sqlPath}`);
      console.log('Please ensure database.sql is in the server root directory');
      return;
    }
    
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    // Split SQL into individual statements
    const statements = sql
      .split(';')
      .filter(stmt => stmt.trim().length > 0)
      .map(stmt => stmt.trim() + ';');
    
    console.log(`📝 Found ${statements.length} SQL statements to execute`);
    
    await client.query('BEGIN');
    
    let executedCount = 0;
    for (const statement of statements) {
      try {
        // Skip comments and empty statements
        if (statement.startsWith('--') || statement.trim() === ';') {
          continue;
        }
        await client.query(statement);
        executedCount++;
        // Log progress every 10 statements
        if (executedCount % 10 === 0) {
          console.log(`📊 Executed ${executedCount}/${statements.length} statements`);
        }
      } catch (error) {
        console.error(`❌ Error executing statement ${executedCount + 1}:`);
        console.error(`Statement: ${statement.substring(0, 100)}...`);
        throw error;
      }
    }
    
    await client.query('COMMIT');
    console.log(`✅ Database migration completed successfully! Executed ${executedCount} statements`);
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Run the migration
runMigration().catch((error) => {
  console.error('Migration failed:', error);
  process.exit(1);
});