import { Request, Response } from "express";
import ProdutoService from "../services/product_service";
import { produtoSchema } from "../schemas/product_schema";
import { z } from "zod";

const produtoService = ProdutoService;

// Listar todos os produtos
export const listarProdutos = async (req: Request, res: Response) => {
  try {
    const produtos = await produtoService.listarProdutos();
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ error: "erro ao listar produtos" });
  }
};

export const obterProduto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const idSchema = z.string();
    const validatedId = idSchema.parse(id);

    const produto = await produtoService.obterProduto(validatedId);
    res.status(200).json(produto);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else if (error instanceof Error) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Erro interno ao buscar o produto." });
    }
  }
};

// Criar um novo produto
export const criarProduto = async (req: Request, res: Response) => {
  try {
    const validatedData = produtoSchema.parse(req.body);

    const novoProduto = await produtoService.criarProduto(validatedData);
    res.status(201).json(novoProduto);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "Ocorreu um erro desconhecido." });
    }
  }
};

export const excluirProduto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idSchema = z.string();
    const validatedId = idSchema.parse(id);

    await produtoService.excluirProduto(validatedId);
    res.status(204).send();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else if (error instanceof Error) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Erro interno ao deletar o produto." });
    }
  }
};

export const atualizarProduto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idSchema = z.string();
    const validatedId = idSchema.parse(id);

    const validatedData = produtoSchema.partial().parse(req.body);

    const produtoAtualizado = await produtoService.atualizarProduto(
      validatedId,
      validatedData
    );
    res.status(200).json(produtoAtualizado);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else if (error instanceof Error) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Erro interno ao atualizar o produto." });
    }
  }
};
