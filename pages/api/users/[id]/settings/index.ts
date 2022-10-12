import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "../../../../../database/dbConnect";
const UserSchema = require("../../../../../models/UserModel");

const bcrypt = require("bcrypt");

interface Data {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  password: string | undefined;
}

const settings = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const {
    method,
    query: { id },
  } = req;
  if (method === "PUT") {
    if (req.body.email) {
      const user = await UserSchema.findByIdAndUpdate(
        { _id: id },
        { email: req.body.email }
      );
      user
        .save()
        .then((data: Data) => {
          return res.status(200).json(data);
        })
        .catch((error: Data) => {
          return res.status(400).json(error);
        });
    }
    if (req.body.password) {
      const saltPassword = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(req.body.password, saltPassword);
      const user = await UserSchema.findByIdAndUpdate(
        { _id: id },
        { password: securePassword }
      );
      user
        .save()
        .then((data: Data) => {
          return res.status(200).json(data);
        })
        .catch((error: Data) => {
          return res.status(400).json(error);
        });
    }
    if (req.body.fullName) {
      const fullNameSplit = req.body.fullName.split(/[\s,]+/);
      const user = await UserSchema.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            firstName: fullNameSplit[0],
            lastName: fullNameSplit[1]
          }
        }
      );
      user
        .save()
        .then((data: Data) => {
          return res.status(200).json(data);
        })
        .catch((error: Data) => {
          return res.status(400).json(error);
        });
    }
  }
};

export default settings;
