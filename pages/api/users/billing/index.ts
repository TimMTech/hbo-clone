import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "../../../../database/dbConnect";
const BillingSchema = require("../../../../models/BillingModel");

interface Data {
  user_id: string | undefined;
  cardName: string | undefined;
  cardNumber: string | undefined;
  exp: string | undefined;
  securityCode: string | undefined;
  zipCode: string | undefined;
  stateOrTerritory: string | undefined;
}

const billing = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await dbConnect();

  const { method } = req;
  if (method === "POST") {
    const billed = await BillingSchema.findOne({
      user_id: req.body.user_id,
    });
    if (!billed) {
      const paymentMethod = await new BillingSchema({
        user_id: req.body.user_id,
        cardName: req.body.cardName,
        cardNumber: req.body.cardNumber,
        exp: req.body.exp,
        securityCode: req.body.securityCode,
        zipCode: req.body.zipCode,
        stateOrTerritory: req.body.stateOrTerritory,
      });
      paymentMethod
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
}

export default billing;
