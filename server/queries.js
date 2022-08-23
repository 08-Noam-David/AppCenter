import { pool } from './database.js';
import { normalizeAppProperties as normalize } from './utils.js';

const executeQuery = async (query, params) => {
  const client = await pool.connect();

  try {
    return client.query(query, params);
  } catch (ex) {
    console.log(e);
  } finally {
    client.release();
  }
};

const getAllApps = async () => {
  const result = await executeQuery(`
    SELECT app_id, 
      image_url,
      app_name,
      price,
      description,
      company_name,
      created_at
    FROM t_applications
    `);

  return result.rows.map(normalize);
};

const searchForApps = async (searchQuery) => {
  const result = await executeQuery(`
  SELECT app_id, 
    image_url,
    app_name,
    price,
    description,
    company_name,
    created_at
  FROM t_applications
  WHERE app_name LIKE ('%' || $1 || '%')
  `, [searchQuery]);

  return result.rows.map(normalize);
}

export { getAllApps, searchForApps };
