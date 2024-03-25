import mongoose from 'mongoose';
import validator from 'validator';

interface User {
  name: string;
  about: string;
  avatar: string;
}

const userSchema = new mongoose.Schema<User>(
  {
    name: {
      type: String,
      required: [true, 'Поле "name" должно быть заполнено'],
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
    },
    about: {
      required: [true, 'Поле "about" должно быть заполнено'],
      type: String,
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [200, 'Максимальная длина поля "name" - 200'],
    },
    avatar: {
      required: [true, 'Поле "avatar" должно быть заполнено'],
      type: String,
      validate: {
        validator: (v: string) => validator.isURL(v),
        message: 'Некорректный URL',
      },
    },
  },
  { versionKey: false },
);

export default mongoose.model<User>('user', userSchema);
