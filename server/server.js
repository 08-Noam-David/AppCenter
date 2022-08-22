import express from 'express';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { getAllApps } from './queries.js';

const app = express();
app.use(express.json());

// Staic files
const __filename = fileURLToPath(import.meta.url);
const staticPath = resolve(__filename, '../..', 'client/');
app.use('/', express.static(staticPath));

app.get('/api/apps', async (req, res) => {
  try {
    const apps = await getAllApps();
    res.send(apps);
  } catch (ex) {
    console.log(ex)
    res.status(500).send('Something went wrong. Please try later.');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
