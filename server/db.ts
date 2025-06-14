import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

// Force Supabase database connection
const SUPABASE_DATABASE_URL = "postgresql://postgres.krspnqedycoppzxjpayd:password@aws-0-us-east-2.pooler.supabase.com:6543/postgres?pgbouncer=true";

console.log("🔗 Connecting to Supabase database:", SUPABASE_DATABASE_URL.split('@')[1]?.split('/')[0]);

export const pool = new Pool({ 
  connectionString: SUPABASE_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
export const db = drizzle(pool, { schema });