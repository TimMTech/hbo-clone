import mongoose from "mongoose";

interface TVSchema {
    user_id: mongoose.Schema.Types.ObjectId
    id: string;
    poster_path: string;
}

const TVModel = new mongoose.Schema<TVSchema>({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  id: {
    type: String,
    required: true,
  },

  poster_path: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.models.TV || mongoose.model("TV", TVModel);
