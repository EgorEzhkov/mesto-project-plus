import mongoose from 'mongoose';
import validator from 'validator';

interface User {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<User>(
  {
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      required: false,
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
    },
    about: {
      required: false,
      default: 'Исследователь',
      type: String,
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [200, 'Максимальная длина поля "name" - 200'],
    },
    avatar: {
      required: false,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      type: String,
      validate: {
        validator: (v: string) => validator.isURL(v),
        message: 'Некорректный URL',
      },
    },
    email: {
      required: [true, 'Поле "email" должно быть заполнено'],
      type: String,
      validate: {
        validator: (v: string) => validator.isEmail(v),
        message: 'Некорректный email',
      },
      unique: true,
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
    },
    password: {
      required: [true, 'Поле "password" должно быть заполнено'],
      type: String,
      minlength: [8, 'Минимальная длина поля "name" - 2'],
    },
  },
  { versionKey: false }
);

export default mongoose.model<User>('user', userSchema);
