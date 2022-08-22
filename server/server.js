import express from 'express';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
app.use(express.json());

// Staic files
const __dirname = fileURLToPath(import.meta.url);
const staticPath = resolve(__dirname, '../..', 'client/');
app.use('/', express.static(staticPath));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
