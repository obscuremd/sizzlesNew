import mongoose, { models } from "mongoose";

const ShopSchema = new mongoose.Schema(
  {
    image: { type: String },
    name: { type: String, required: true },
    status: { type: Boolean, required: true },
    delivery_fee: { type: String, required: true },
    preparation_time: { type: String, required: true },
    products: { type: Array<String>, default: [] },
  },
  { timestamps: true }
);

export const Shop = models.Shop || mongoose.model("Shop", ShopSchema);
