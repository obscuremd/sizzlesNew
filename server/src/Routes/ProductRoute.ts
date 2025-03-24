import { Router } from "express";
import {
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
} from "../Helpers/Product.controller";
import { Product } from "../Models/ProductModel";

const router = Router();

// 🟣 Get all shops
router.get("/", async (request, response) => {
  try {
    const products = await Product.find();

    response.status(200).json({
      response: "success",
      message: "Products found",
      data: products,
    });
  } catch (error) {
    response.status(200).json({
      response: "error",
      message: "Shop found",
      data: error,
    });
  }
});

// 🟢 Create a product
router.post("/create/:shopId", createProduct);

// 🔵 Get a product by ID
router.get("/:id", getProductById);

// 🟠 Update a product by ID
router.put("/:id", updateProductById);

// 🔴 Delete a product by ID
router.delete("/:id", deleteProductById);

export default router;
