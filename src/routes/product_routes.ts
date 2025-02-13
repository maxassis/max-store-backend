import express from "express";
import {
  listProducts,
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/product_controller";

const router = express.Router();

router.get("/", listProducts);

router.post("/", createProduct);

router.get("/:id", getProduct);

router.delete("/:id", deleteProduct);

router.patch("/:id", updateProduct);

export default router;
