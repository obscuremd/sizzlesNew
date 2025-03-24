import { Router } from "express";
import {
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
} from "../Helpers/Product.controller";

const router = Router();

// 🟢 Create a product
router.post("/create/:shopId", createProduct);

// 🔵 Get a product by ID
router.get("/:id", getProductById);

// 🟠 Update a product by ID
router.put("/:id", updateProductById);

// 🔴 Delete a product by ID
router.delete("/:id", deleteProductById);

export default router;
