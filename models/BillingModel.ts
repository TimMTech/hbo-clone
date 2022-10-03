import mongoose from "mongoose";

interface BillingSchema {
  user_id: mongoose.Schema.Types.ObjectId;
  cardName: string;
  cardNumber: string;
  exp: string;
  securityCode: string;
  zipCode: string;
  stateOrTerritory: string;
}

const BillingModel = new mongoose.Schema<BillingSchema>({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  cardName: {
    type: String,
    required: true
  },
  cardNumber: {
    type: String,
    required: true,
  },
  exp: {
    type: String,
    required: true,
  },
  securityCode: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  stateOrTerritory: {
    type: String,
    required: true,
  },
});

module.exports =
  mongoose.models.Billing || mongoose.model("Billing", BillingModel);
