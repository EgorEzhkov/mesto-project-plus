import mongoose from 'mongoose';

interface User {
  name: string;
  about: string;
  avatar: string;
}

const userSchema = new mongoose.Schema<User>({
  name: {
    required: true,
    type: String,
    maxlength: 30,
    minlength: 2,
  },
  about: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 200,
  },
  avatar: {
    required: true,
    type: String,
  },
});

export default mongoose.model<User>('user', userSchema);
