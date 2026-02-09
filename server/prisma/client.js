import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config';

// Prisma 7 with prisma.config.ts requires an adapter
// Ensure DATABASE_URL is available
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Parse the connection string to ensure it's valid
const connectionString = process.env.DATABASE_URL.trim();
if (!connectionString.startsWith('postgresql://')) {
  throw new Error('DATABASE_URL must be a valid PostgreSQL connection string');
}

const pool = new Pool({ 
  connectionString,
  ssl: connectionString.includes('render.com') ? { rejectUnauthorized: false } : undefined,
  max: 10, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Handle pool errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

export default prisma;

