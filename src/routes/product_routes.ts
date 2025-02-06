import express from "express";
import {
  listarProdutos,
  criarProduto,
  atualizarProduto,
  excluirProduto,
} from "../controllers/product_controller";

const router = express.Router();

router.get("/", listarProdutos);

router.post("/", criarProduto);

router.put("/:id", atualizarProduto);

router.delete("/:id", excluirProduto);

export default router;
