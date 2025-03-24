import { Request, Response } from "express";
import { User } from "../Models/UserModel";

export async function register(request: Request, response: Response) {
  try {
    const {
      email,
      username,
      firstName,
      lastName,
      phoneNumber,
      residentialAddress,
    } = request.body;
    const user = await User.create({
      email,
      username,
      firstName,
      lastName,
      phoneNumber,
      residentialAddress,
    });
    response
      .status(200)
      .json({ response: "success", message: "success", data: user });
  } catch (error) {
    response
      .status(500)
      .json({ response: "failed", message: "error", data: error });
  }
}

export async function getUserByEmail(request: Request, response: Response) {
  try {
    const user = await User.findOne({ email: request.params.email });
    if (user) {
      response
        .status(200)
        .json({ response: "success", message: "user found", data: user });
    } else {
      response
        .status(401)
        .json({ response: "failed", message: "user not found" });
    }
  } catch (error) {
    response
      .status(500)
      .json({ response: "failed", message: "error", data: error });
  }
}
export async function updateUserByEmail(request: Request, response: Response) {
  try {
    const user = await User.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
    });
    if (user) {
      response.status(200).json({
        response: "success",
        message: "user successfully updated",
        data: user,
      });
    } else {
      response
        .status(401)
        .json({ response: "failed", message: "user not found" });
    }
  } catch (error) {
    response
      .status(500)
      .json({ response: "failed", message: "error", data: error });
  }
}

export async function updateCart(request: Request, response: Response) {
  try {
    const { id } = request.params; // Extract user ID
    const { productId, action } = request.body; // Extract product ID & action type

    if (!productId || !["add", "remove"].includes(action)) {
      response.status(400).json({
        response: "failed",
        message: "Product ID and valid action ('add' or 'remove') are required",
      });
      return;
    }

    const updateOperation =
      action === "add"
        ? { $addToSet: { cart: productId } }
        : { $pull: { cart: productId } };

    const user = await User.findByIdAndUpdate(id, updateOperation, {
      new: true,
    });

    if (!user) {
      response.status(404).json({
        response: "failed",
        message: "User not found",
      });
      return;
    }

    response.status(200).json({
      response: "success",
      message: `Product ${action === "add" ? "added to" : "removed from"} cart`,
      data: user.cart,
    });
  } catch (error) {
    response.status(500).json({
      response: "failed",
      message: "Error updating cart",
      error: error,
    });
  }
}

export async function updateSavedItems(request: Request, response: Response) {
  try {
    const { id } = request.params; // Extract user ID
    const { productId, action } = request.body; // Extract product ID & action type

    if (!productId || !["add", "remove"].includes(action)) {
      response.status(400).json({
        response: "failed",
        message: "Product ID and valid action ('add' or 'remove') are required",
      });
      return;
    }

    const updateOperation =
      action === "add"
        ? { $addToSet: { saved_items: productId } } // Prevents duplicates
        : { $pull: { saved_items: productId } }; // Removes product

    const user = await User.findByIdAndUpdate(id, updateOperation, {
      new: true,
    });

    if (!user) {
      response.status(404).json({
        response: "failed",
        message: "User not found",
      });
      return;
    }

    response.status(200).json({
      response: "success",
      message: `Product ${
        action === "add" ? "added to" : "removed from"
      } saved items`,
      data: user.saved_items,
    });
  } catch (error) {
    response.status(500).json({
      response: "failed",
      message: "Error updating saved items",
      error: error,
    });
  }
}
