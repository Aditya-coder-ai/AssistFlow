import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runInit() {
  try {
    const sqlPath = path.join(__dirname, 'init.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    console.log('Connecting to database and running init.sql...');
    await pool.query(sql);
    console.log('Successfully initialized database with mock tickets!');
  } catch (err) {
    console.error('Error running init.sql:', err);
  } finally {
    await pool.end();
  }
}

runInit();
