import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import userRouter from './routes/users';
import cardRouter from './routes/cards';
import signInUp from './routes/signUpIn';
import fakeUser from './middlewares/fakeUser';
import error, { notFoundAdress } from './middlewares/error';
import auth from './middlewares/auth';

const { PORT = 3000 } = process.env;
const app = express();

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1/mestodb');

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fakeUser);

app.use('/', signInUp);

app.use(auth)

app.use('/', userRouter);
app.use('/', cardRouter);

app.use('*', notFoundAdress);

app.use(error);

app.listen(PORT, () => {
  console.log(`Порт сервера: ${PORT} `);
});
