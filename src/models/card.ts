import mongoose from "mongoose";

interface Card {
  name: string;
  link: string;
  owner: mongoose.Types.ObjectId;
  likes: [] | mongoose.Types.ObjectId[];
  createdAd: Date;
}

const cardScheme = new mongoose.Schema<Card>({
  name: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    required: true,
    type: String,
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "ownerCard",
  },
  likes: {
    required: true,
    default: [],
    type: [mongoose.Schema.Types.ObjectId],
    ref: "users",
  },
});

export default mongoose.model<Card>("card", cardScheme);
