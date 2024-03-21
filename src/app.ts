import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/users';
import cardRouter from './routes/cards';
import fakeUser from './middlewares/fakeUser';

const { PORT = 3000 } = process.env;
const app = express();

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fakeUser);

app.use('/', userRouter);
app.use('/', cardRouter);

app.listen(PORT, () => {
  console.log(`Порт сервера: ${PORT} `);
});
