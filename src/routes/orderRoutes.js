import express from "express";
import { placeOrder } from "../controllers/orderController.js";

const router = express.Router();

// POST -> Place Order
router.post("/", placeOrder);

export default router;
