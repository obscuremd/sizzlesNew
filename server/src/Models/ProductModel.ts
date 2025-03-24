import mongoose, { models } from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    image: { type: String },
    name: { type: String, required: true },
    shopId: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: String, required: true },
  },
  { timestamps: true }
);

export const Product =
  models.Product || mongoose.model("Product", ProductSchema);
