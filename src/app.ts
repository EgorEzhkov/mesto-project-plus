import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import { errors } from 'celebrate';
import signInUp from './routes/signUpIn';
import error from './middlewares/error';
import auth from './middlewares/auth';
import logger from './middlewares/logger';
import router from './routes/index';
import config from './config';

const app = express();

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1/mestodb');

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger.requestLogger);

app.use('/', signInUp);

app.use(auth);

app.use('/', router);

app.use(logger.errorLogger);

app.use(errors());

app.use(error);

app.listen(config.PORT, () => {
  console.log(`Порт сервера: ${config.PORT} `);
});
