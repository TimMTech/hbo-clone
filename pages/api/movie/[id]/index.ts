import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../database/dbConnect";
import mongoose from "mongoose";
import { remove } from "nprogress";
const MovieSchema = require("../../../../models/MovieModel");
const UserSchema = require("../../../../models/UserModel");

interface Data {
  _id: mongoose.Schema.Types.ObjectId;
  user_id: mongoose.Schema.Types.ObjectId;
  backdrop_path: string;
}

const movie = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await dbConnect();
  const { method } = req;
  if (method === "POST") {
    const movie = await new MovieSchema({
      user_id: req.body.user_id,
      id: req.body.id,
      poster_path: req.body.poster_path,
    });
    movie
      .save()
      .then(async (data: Data) => {
        const user = await UserSchema.findByIdAndUpdate(
          { _id: data.user_id },
          {
            $push: {
              movies: data._id,
            },
          }
        );
        user.save();

        return res.status(200).json(data);
      })
      .catch((error: Data) => {
        console.log(error);
      });
  }
  if (method === "DELETE") {
    const removedMovie = await MovieSchema.findOneAndDelete({
      id: req.body.id,
      new: true,
    });
    if (removedMovie) {
      const user = await UserSchema.findByIdAndUpdate(
        { _id: removedMovie.user_id },
        {
          $pull: {
            movies: removedMovie._id,
          },
        }
      );
      user.save();
      return res.status(200).json(removedMovie);
    }
    return res.status(400);
  }
};

export default movie;
