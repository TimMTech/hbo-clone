import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "../../../database/dbConnect";
const UserSchema = require("../../../models/UserModel");
const bcrypt = require("bcrypt");

interface Data {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  password: string | undefined;
  
}

const users = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await dbConnect();

  const { method } = req;
  if (method === "POST") {
    const users = await UserSchema.findOne({
      email: req.body.email,
    });
    if (!users) {
      const saltPassword = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(req.body.password, saltPassword);
      const user = await new UserSchema({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: securePassword,
        ads: req.body.ads,
        billing: req.body.billing
      });
      user
        .save()
        .then((data: Data) => {
          return res.status(200).json(data);
        })
        .catch((error: Data) => {
          return res.status(400).json(error);
        });
    } else {
      return res.status(400);
    }
  }
};

export default users;
