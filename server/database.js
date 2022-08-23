// As of writing these lines, node-postgres is a CommonJs module
import pg from 'pg';
const { Pool, types } = pg;

types.setTypeParser(types.builtins.MONEY, (val) =>
  parseFloat(val.substring(2))
);

const databaseConfig = {
  user: 'postgres',
  password: '123',
  host: 'localhost',
  port: 5432,
  database: 'apps_center',
};

const pool = new Pool(databaseConfig);

export { pool };
