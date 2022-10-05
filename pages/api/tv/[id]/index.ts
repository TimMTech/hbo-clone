import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../database/dbConnect";
import mongoose from "mongoose";

const TVSchema = require("../../../../models/TVModel");
const UserSchema = require("../../../../models/UserModel");

interface Data {
  _id: mongoose.Schema.Types.ObjectId;
  user_id: mongoose.Schema.Types.ObjectId;
  backdrop_path: string;
}

const tv = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await dbConnect();
  const { method } = req;
  if (method === "POST") {
    const tv = await new TVSchema({
      user_id: req.body.user_id,
      id: req.body.id,
      poster_path: req.body.poster_path,
    });
    tv.save()
      .then(async (data: Data) => {
        const user = await UserSchema.findByIdAndUpdate(
          { _id: data.user_id },
          {
            $push: {
              tv: data._id,
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
    const removedTV = await TVSchema.findOneAndDelete({ id: req.body.id });
    if (removedTV) {
      const user = await UserSchema.findByIdAndUpdate(
        { _id: removedTV.user_id },
        {
          $pull: {
            tv: removedTV._id,
          },
        }
      );
      user.save();
      return res.status(200).json(removedTV);
    }
    return res.status(400);
  }
};

export default tv;
