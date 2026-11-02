import express from 'express';
import errorServer from './backend/middleware/errorServer.js';
import notFound from './backend/middleware/notFound.js';

const app = express();
const port = process.env.PORT || 3000;

/* app.use(express.static('public')); */
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ messaggio: 'API di Bacheca' });
});



// Middleware per rotte non trovate (404) e gestione errori (500)
app.use(notFound);
app.use(errorServer);


app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});
