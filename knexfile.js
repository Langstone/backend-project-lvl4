// @ts-check

import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url), 'utf-8');

const migrations = {
  directory: path.join(__dirname, 'server', 'migrations'),
};

export const production = {
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  },
  useNullAsDefault: true,
  migrations,
};

export const development = {
  client: 'sqlite3',
  connection: {
    filename: './database.sqlite',
  },
  pool: {
    afterCreate: (conn, cb) =>
      conn.run('PRAGMA foreign_keys = ON', cb),
  },
  useNullAsDefault: true,
  migrations,
};

export const test = {
  client: 'sqlite3',
  connection: ':memory:',
  useNullAsDefault: true,
  // debug: true,
  migrations,
};