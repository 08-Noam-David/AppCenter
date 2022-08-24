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
};

const createApp = async (app) => {
  const result = await executeQuery(`
  INSERT
  INTO t_applications (
    app_id, 
    image_url,
    app_name,
    price,
    description,
    company_name
  )
  VALUES ($1, $2, $3, $4::money, $5, $6)
  `, [
    app.id,
    app.imageUrl,
    app.name,
    app.price,
    app.desc,
    app.companyName
  ]);

  return result.rowCount === 1;
};

const deleteApp = async (id) => {
  const result = await executeQuery(`
  DELETE
  FROM t_applications
  WHERE app_id = $1
  `, [id]);

  return result.rowCount === 1;
};

const findSpecificApp = async (id) => {
  const result = await executeQuery(`
  SELECT app_id, 
    image_url,
    app_name,
    price,
    description,
    company_name,
    created_at
  FROM t_applications
  WHERE app_id = $1
  `, [id]);

  return result.rows.map(normalize);
};

export { getAllApps, searchForApps, createApp, deleteApp, findSpecificApp };
