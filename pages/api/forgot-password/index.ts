import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import dbConnect from "../../../database/dbConnect";
const UserSchema = require("../../../models/UserModel");

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


const forgotPassword = async (req:NextApiRequest, res:NextApiResponse<Data>) => {
    await dbConnect()
    const {method } = req;

    if (method === "POST") {
        const user = await UserSchema.findOne({
            email: req.body.email
        })
        if (user) {
            return res.status(200).json(user)
        }
        return res.status(400).json(user)
    }
}

export default forgotPassword