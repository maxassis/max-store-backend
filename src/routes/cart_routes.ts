import express from "express";
import { updateOrCreateCartController } from "../controllers/cart_controller";

const router = express.Router();

router.post("/", updateOrCreateCartController);

export default router;
