import express from "express";
import {
  listarProdutos,
  criarProduto,
  obterProduto,
  excluirProduto,
  atualizarProduto,
} from "../controllers/product_controller";

const router = express.Router();

router.get("/", listarProdutos);

router.post("/", criarProduto);

router.get("/:id", obterProduto);

router.delete("/:id", excluirProduto);

router.patch("/:id", atualizarProduto);

export default router;
