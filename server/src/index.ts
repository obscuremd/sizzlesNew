import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import UserRoute from "./Routes/UserRoute";
import ProductRoute from "./Routes/ProductRoute";
import ShopRoute from "./Routes/ShopRoute";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

const mongoUrl = process?.env?.MONGO_URL;
if (!mongoUrl) {
  throw new Error("MONGO_URL environment variable is not defined");
}

// connect to mongoose
mongoose.connect(mongoUrl);
mongoose.connection.on("connected", () => {
  console.log("mongoDB connection established");
});
mongoose.connection.on("error", () => {
  console.log("connection error");
});

// middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        [
          "https://car-management-iota.vercel.app",
          "http://localhost:5173",
          "http://localhost:5174",
          "https://euro65.vercel.app",
        ].includes(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Set-Cookie"],
    credentials: true, // Allow cookies and credentials
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome hello worldss");
});

// endpoints
app.use("/user", UserRoute);
app.use("/product", ProductRoute);
app.use("/shop", ShopRoute);

app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`);
});

export default app;
