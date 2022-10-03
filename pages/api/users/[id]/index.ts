import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "../../../../database/dbConnect";
const UserSchema = require("../../../../models/UserModel");
const MovieSchema = require("../../../../models/MovieModel");

const favourites = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const {
    method,
    query: { id },
  } = req;
  if (method === "GET") {
    const user = await UserSchema.findById(id).populate({
      path: "movies",
      model: MovieSchema,
    });

    if (user) {
      return res.status(200).json(user.movies);
    }
    return res.status(400);
  }
};

export default favourites;
