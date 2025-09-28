import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Api Routes
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/place-orders", orderRoutes);
app.use("/api/v1/categories", categoryRoutes);

app.get("/api/v1/health", (_, res) => {
  res.send("E-commerce API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
