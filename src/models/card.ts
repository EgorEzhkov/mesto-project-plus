import mongoose from 'mongoose';
import validator from 'validator';
import validation from '../utils/validation';

interface Card {
  name: string;
  link: string;
  owner: mongoose.Types.ObjectId;
  likes: [] | mongoose.Types.ObjectId[];
  createdAd: Date;
}

const cardScheme = new mongoose.Schema<Card>(
  {
    name: {
      type: String,
      required: [true, 'Поле "name" должно быть заполнено'],
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
    },
    link: {
      required: [true, 'Поле "link" должно быть заполнено'],
      type: String,
      validate: {
        validator: (v: string) => validation.regUrl.test(v),
        message: 'Некорректный URL',
      },
    },
    owner: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ownerCard',
    },
    likes: {
      default: [],
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'users',
    },
    createdAd: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

export default mongoose.model<Card>('card', cardScheme);
