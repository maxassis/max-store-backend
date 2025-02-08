import express from "express";
import { updateOrCreateCart } from "../controllers/cart_controller";

const router = express.Router();

router.post("/", updateOrCreateCart);

export default router;
