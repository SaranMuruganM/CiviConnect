import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./router/authRouter.js";
import issuesRouter from "./router/issuesRouter.js";
import cookieParser from "cookie-parser";
import { checkLoggedIn } from "./middleware/authMiddleware.js";
import { v2 as cloudinary } from "cloudinary";
const app = express();

app.use(cookieParser());
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1/auth/", authRouter);
app.use("/v1/issues/", checkLoggedIn, issuesRouter);


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log(`DB Connected`);
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
