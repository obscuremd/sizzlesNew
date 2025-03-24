import { Router } from "express";
import {
  getUserByEmail,
  register,
  updateCart,
  updateSavedItems,
  updateUserByEmail,
} from "../Helpers/User.controller";
import { User } from "../Models/UserModel";

const router = Router();

// get all users
router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// create user
router.post("/register", register);

// get by email
router.get("/:email", getUserByEmail);

// update by email
router.put("/:email", updateUserByEmail);

// update cart
router.put("/cart/:id", updateCart);

// update cart
router.put("/saves/:id", updateSavedItems);

export default router;
