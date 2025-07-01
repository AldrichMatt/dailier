import pgPromise from "pg-promise";
import dotenv from "dotenv";

dotenv.config();

const pgp = pgPromise();
export const db = pgp(process.env.DATABASE_URL)

db.one('SELECT 1')
  .then(() => console.log('✅ PostgreSQL connected!'))
  .catch(err => console.error('❌ Connection failed:', err));