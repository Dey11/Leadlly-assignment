import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { router as userRouter } from "./routes/user.route";
import { router as productRouter } from "./routes/product.route";
import { connectToDB } from "./db";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

connectToDB(process.env.MONGO_URI as string);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

app.listen(PORT, () => {
  console.log("Server is running on PORT: ", PORT);
});
