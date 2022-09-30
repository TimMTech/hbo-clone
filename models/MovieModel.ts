import mongoose from "mongoose";

interface MovieSchema {
  user_id: mongoose.Schema.Types.ObjectId;
  original_title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  runtime: number;
  backdrop_path: string;
}

const MovieModel = new mongoose.Schema<MovieSchema>({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  original_title: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  release_date: {
    type: String,
    required: true,
  },
  vote_average: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.models.Movie || mongoose.model("Movie", MovieModel);
