import mongoose from "mongoose";

interface MovieSchema {
  user_id: mongoose.Schema.Types.ObjectId;
  id: string;
  poster_path: string;
}

const MovieModel = new mongoose.Schema<MovieSchema>({
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

module.exports = mongoose.models.Movie || mongoose.model("Movie", MovieModel);
