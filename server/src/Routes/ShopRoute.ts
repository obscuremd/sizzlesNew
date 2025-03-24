import { Router } from "express";
import {
  createShop,
  getShopById,
  updateShopById,
  deleteShopById,
} from "../Helpers/Shop.controller";

const router = Router();

// 🟢 Create a shop
router.post("/create", createShop);

// 🔵 Get a shop by ID
router.get("/:id", getShopById);

// 🟠 Update a shop by ID
router.put("/:id", updateShopById);

// 🔴 Delete a shop by ID
router.delete("/:id", deleteShopById);

export default router;
