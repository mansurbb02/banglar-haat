/**
 * LOCAL — Express API stub
 * Run: node server/index.js
 */
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (_, res) => res.json({ ok: true, service: 'LOCAL API' }));
app.get('/api/haat', (_, res) => res.json({ message: 'Replace with real haat event from DB' }));
app.get('/api/products', (_, res) => res.json({ message: 'Replace with products query' }));
app.get('/api/products/:slug', (req, res) => res.json({ message: 'Product by slug', slug: req.params.slug }));
app.get('/api/creators', (_, res) => res.json({ message: 'Creators list' }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`LOCAL API listening on :${PORT}`));
