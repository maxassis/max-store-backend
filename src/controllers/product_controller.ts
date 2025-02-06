import { Request, Response } from "express";
import ProdutoService from "../services/product_service";

const produtoService = ProdutoService;

// Listar todos os produtos
export const listarProdutos = async (req: Request, res: Response) => {
  try {
    const produtos = await produtoService.listarProdutos();
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

// // Criar um novo produto
export const criarProduto = async (req: Request, res: Response) => {
  try {
    const { name, description, qtdProduct } = req.body;
    const novoProduto = await produtoService.criarProduto({
      name,
      description,
      qtdProduct,
    });
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Atualizar um produto por ID
export const atualizarProduto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, qtdProduct } = req.body;
    const produtoAtualizado = await produtoService.atualizarProduto(id, {
      name,
      description,
      qtdProduct,
    });
    res.status(200).json(produtoAtualizado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Excluir um produto por ID
export const excluirProduto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const resultado = await produtoService.excluirProduto(id);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
