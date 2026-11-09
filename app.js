import express from 'express';
import errorServer from './backend/middleware/errorServer.js';
import notFound from './backend/middleware/notFound.js';
import annunciRouter from './backend/routers/api/annunci.js';
import categorieRouter from './backend/routers/api/categorie.js';


const app = express();
const port = process.env.PORT || 3000;

/* app.use(express.static('public')); */
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ messaggio: 'API di Bacheca' });
});

app.use('/api/annunci', annunciRouter);
app.use('/api/categorie', categorieRouter);


// Middleware per rotte non trovate (404) e gestione errori (500)
app.use(notFound);
app.use(errorServer);


app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});
