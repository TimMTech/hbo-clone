import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "../../../../database/dbConnect";
const UserSchema = require("../../../../models/UserModel");
const MovieSchema = require("../../../../models/MovieModel");
const TVSchema = require("../../../../models/TVModel");


interface Data {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  password: string | undefined;
}

const favourites = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
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
