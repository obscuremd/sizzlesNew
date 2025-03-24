import { Router, Response } from "express";
import {
  createShop,
  getShopById,
  updateShopById,
  deleteShopById,
} from "../Helpers/Shop.controller";
import { Shop } from "../Models/ShopModel";

const router = Router();

// 🟣 Get all shops
router.get("/", async (request, response) => {
  try {
    const shops = await Shop.find();

    response.status(200).json({
      response: "success",
      message: "Shop found",
      data: shops,
    });
  } catch (error) {
    response.status(200).json({
      response: "error",
      message: "Shop found",
      data: error,
    });
  }
});

// 🟢 Create a shop
router.post("/create", createShop);

// 🔵 Get a shop by ID
router.get("/:id", getShopById);

// 🟠 Update a shop by ID
router.put("/:id", updateShopById);

// 🔴 Delete a shop by ID
router.delete("/:id", deleteShopById);

export default router;
