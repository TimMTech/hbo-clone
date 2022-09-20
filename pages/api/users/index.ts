import type { NextApiRequest, NextApiResponse } from "next";
import UserSchema from "../../../models/UserModel"
const bcrypt = require("bcrypt")

interface Data {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const users = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { method } = req;
  if (method === "POST") {
    
  }
};
