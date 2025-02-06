import express from "express";
import {
  listarProdutos,
  criarProduto,
  obterProduto,
} from "../controllers/product_controller";

const router = express.Router();

router.get("/", listarProdutos);

router.post("/", criarProduto);

router.get("/:id", obterProduto);

export default router;
