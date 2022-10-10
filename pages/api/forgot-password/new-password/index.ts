import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import dbConnect from "../../../../database/dbConnect";
const UserSchema = require("../../../../models/UserModel");
const bcrypt = require("bcrypt");

interface Data {
  _id: mongoose.Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  ads: string;
  billing: string;
  movies: [];
  tv: [];
}

const newPassword = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await dbConnect();
  const { method } = req;
  if (method === "POST") {
    const saltPassword = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password, saltPassword);

    const user = await UserSchema.findByIdAndUpdate(
      { _id: req.body.userId },
      {
        password: securePassword,
      }
    );
  
    user
      .save()
      .then((data:Data) => {
        return res.status(200).json(data);
      })
      .catch((error:Data) => {
        return res.status(400).json(error);
      });
  }
};

export default newPassword;
