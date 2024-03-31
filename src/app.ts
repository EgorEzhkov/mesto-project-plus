import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import userRouter from './routes/users';
import cardRouter from './routes/cards';
import signInUp from './routes/signUpIn';
import error, { notFoundAdress } from './middlewares/error';
import auth from './middlewares/auth';
import logger from './middlewares/logger';
import { errors } from 'celebrate';

const { PORT = 3000 } = process.env;
const app = express();

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1/mestodb');

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger.requestLogger);

app.use('/', signInUp);

app.use(auth);

app.use('/', userRouter);
app.use('/', cardRouter);

app.use('*', notFoundAdress);

app.use(logger.errorLogger);

app.use(errors());

app.use(error);

app.listen(PORT, () => {
  console.log(`Порт сервера: ${PORT} `);
});
