import { Request, Response } from "express";
import { Product } from "../Models/ProductModel"; // Ensure correct import
import { Shop } from "../Models/ShopModel";
import mongoose from "mongoose";

// 🟢 Create a new product
export async function createProduct(request: Request, response: Response) {
  try {
    const { image, name, category, price } = request.body;
    const shopId = request.params.shopId;
    const product = await Product.create({
      image,
      name,
      shopId,
      category,
      price,
    });

    const updatedShop = await Shop.findByIdAndUpdate(shopId, {
      $push: { products: product._id },
      new: true,
    });

    response.status(200).json({
      response: "success",
      message: "Product successfully created",
      data: product,
      shop: updatedShop,
    });
  } catch (error) {
    response.status(500).json({
      response: "failed",
      message: "Error creating product",
      error: error,
    });
  }
}

// 🔵 Get product by ID
export async function getProductById(request: Request, response: Response) {
  try {
    const product = await Product.findById(request.params.id);

    if (product) {
      response.status(200).json({
        response: "success",
        message: "Product found",
        data: product,
      });
    } else {
      response
        .status(404)
        .json({ response: "failed", message: "Product not found" });
    }
  } catch (error) {
    response.status(500).json({
      response: "failed",
      message: "Error fetching product",
      error: error,
    });
  }
}

// 🟠 Update product by ID
export async function updateProductById(request: Request, response: Response) {
  try {
    const product = await Product.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
      }
    );

    if (product) {
      response.status(200).json({
        response: "success",
        message: "Product successfully updated",
        data: product,
      });
    } else {
      response
        .status(404)
        .json({ response: "failed", message: "Product not found" });
    }
  } catch (error) {
    response.status(500).json({
      response: "failed",
      message: "Error updating product",
      error: error,
    });
  }
}

// 🔴 Delete product by ID
export async function deleteProductById(request: Request, response: Response) {
  try {
    const { id } = request.params; // Extract product ID
    const { shopId } = request.body; // Extract shop ID

    if (!shopId) {
      response.status(400).json({
        response: "failed",
        message: "Shop ID is required",
      });
      return;
    }

    // ✅ Find and delete the product
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      response.status(404).json({
        response: "failed",
        message: "Product not found",
      });
      return;
    }

    // ✅ Find the shop and ensure it exists
    const shop = await Shop.findById(shopId);
    if (!shop) {
      response.status(404).json({
        response: "failed",
        message: "Shop not found",
      });
      return;
    }

    // ✅ Remove product ID from shop's `products` array
    shop.products = shop.products.filter(
      (prodId: mongoose.Types.ObjectId | string) =>
        prodId.toString() !== id.toString()
    );
    await shop.save();

    response.status(200).json({
      response: "success",
      message: "Product successfully deleted",
      data: { deletedProduct: product, updatedShop: shop },
    });
  } catch (error) {
    response.status(500).json({
      response: "failed",
      message: "Error deleting product",
      error: error,
    });
  }
}
