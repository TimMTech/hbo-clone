import type { NextApiRequest, NextApiResponse } from "next";
import { userAgent } from "next/server";
import dbConnect from "../../../../database/dbConnect";
const MovieSchema = require("../../../../models/MovieModel");
const UserSchema = require("../../../../models/UserModel");
import mongoose from "mongoose";

interface Data {
  _id: mongoose.Schema.Types.ObjectId;
  user_id: mongoose.Schema.Types.ObjectId;
  backdrop_path: string;
  original_title: string;
  runtime: number;
  release_date: string;
  vote_average: number;
  overview: string;
}

const movie = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await dbConnect();
  const { method } = req;
  if (method === "POST") {
    const movie = await new MovieSchema({
      user_id: req.body.user_id,
      original_title: req.body.original_title,
      overview: req.body.overview,
      backdrop_path: req.body.backdrop_path,
      release_date: req.body.release_date,
      runtime: req.body.runtime,
      vote_average: req.body.vote_average,
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
      })
      .catch((error: Data) => {
        console.log(error);
      });
  }
};

export default movie;
