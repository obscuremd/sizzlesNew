import { Request, Response } from "express";
import { Shop } from "../Models/ShopModel"; // Ensure correct import

// 🟢 Create a new shop
export async function createShop(request: Request, response: Response) {
  try {
    const { image, name, status, delivery_fee, preparation_time, products } =
      request.body;

    const shop = await Shop.create({
      image,
      name,
      status,
      delivery_fee,
      preparation_time,
      products,
    });

    response.status(200).json({
      response: "success",
      message: "Shop successfully created",
      data: shop,
    });
  } catch (error) {
    response.status(500).json({
      response: "failed",
      message: "Error creating shop",
      error: error,
    });
  }
}

// 🔵 Get a shop by ID
export async function getShopById(request: Request, response: Response) {
  try {
    const shop = await Shop.findById(request.params.id);

    if (shop) {
      response.status(200).json({
        response: "success",
        message: "Shop found",
        data: shop,
      });
    } else {
      response
        .status(404)
        .json({ response: "failed", message: "Shop not found" });
    }
  } catch (error) {
    response.status(500).json({
      response: "failed",
      message: "Error fetching shop",
      error: error,
    });
  }
}

// 🟠 Update a shop by ID
export async function updateShopById(request: Request, response: Response) {
  try {
    const shop = await Shop.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
    });

    if (shop) {
      response.status(200).json({
        response: "success",
        message: "Shop successfully updated",
        data: shop,
      });
    } else {
      response
        .status(404)
        .json({ response: "failed", message: "Shop not found" });
    }
  } catch (error) {
    response.status(500).json({
      response: "failed",
      message: "Error updating shop",
      error: error,
    });
  }
}

// 🔴 Delete a shop by ID
export async function deleteShopById(request: Request, response: Response) {
  try {
    const shop = await Shop.findByIdAndDelete(request.params.id);

    if (shop) {
      response.status(200).json({
        response: "success",
        message: "Shop successfully deleted",
      });
    } else {
      response
        .status(404)
        .json({ response: "failed", message: "Shop not found" });
    }
  } catch (error) {
    response.status(500).json({
      response: "failed",
      message: "Error deleting shop",
      error: error,
    });
  }
}
