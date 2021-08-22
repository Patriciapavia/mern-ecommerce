import dotenv from "dotenv";
dotenv.config();
import express from "express";
import colors from "colors";
import connectDB from "../backend/config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes  from './routes/userRoutes.js'
import orderRoutes  from "./routes/orderRoutes.js"


connectDB();

const app = express();

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Api is running...");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use('/api/orders', orderRoutes);



app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
