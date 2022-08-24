import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid/async';
import Joi from 'joi';

import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { getAllApps, searchForApps, createApp } from './queries.js';
import { validateApp } from './utils.js';

const app = express();
app.use(express.json());

app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Staic files
const __filename = fileURLToPath(import.meta.url);
const staticPath = resolve(__filename, '../..', 'client/');
app.use('/', express.static(staticPath));

app.get('/api/apps', async (req, res) => {
  const searchQuery = req.query.search;
  let apps;

  try {
    if (searchQuery) {
      apps = await searchForApps(searchQuery);
    } else {
      apps = await getAllApps();
    }

    res.send(apps);
  } catch (ex) {
    res.status(500).send('Something went wrong. Please try later.');
  }
});

app.post('/api/apps', async (req, res) => {
  try {

    const [formData, id] = await Promise.all([validateApp(req.body), nanoid()]);

    const newApp = {
      id,
      ...formData,
    };

    const result = await createApp(newApp);

    if (result) {
      res.send(newApp);
    } else {
      res.status(500).send('Something went wrong. Please try later.');
    }
  } catch (ex) {
    if (ex instanceof Joi.ValidationError) {
      res.status(400).send(ex.details.map((err) => err.message));
    } else {
      res.status(500).send('Something went wrong. Please try later.');
    }
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
