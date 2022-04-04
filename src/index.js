import express from 'express';
import genRouter from './routes/generic.js';

const PORT = process.env.SERVER_PORT || 8000;
const app = express();

app.use(express.json())
app.use(genRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));