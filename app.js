import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ messaggio: 'API di Bacheca' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Rotta non trovata' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Errore del server' });
});

app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});
