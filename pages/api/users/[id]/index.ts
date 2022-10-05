import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "../../../../database/dbConnect";
const UserSchema = require("../../../../models/UserModel");
const MovieSchema = require("../../../../models/MovieModel");
const TVSchema = require("../../../../models/TVModel");

const favourites = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const {
    method,
    query: { id },
  } = req;
  if (method === "GET") {
    const user = await UserSchema.findById(id)
      .populate({
        path: "movies",
        model: MovieSchema,
      })
      .populate({
        path: "tv",
        model: TVSchema,
      });

    if (user) {
      return res.status(200).json(user);
    }
    return res.status(400);
  }
};

export default favourites;
