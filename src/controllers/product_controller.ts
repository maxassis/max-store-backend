import { Request, Response } from "express";
import ProdutoService from "../services/product_service";
import { productSchema } from "../schemas/product_schema";
import { z } from "zod";

const productService = ProdutoService;

export const listProducts = async (req: Request, res: Response) => {
  try {
    const produtos = await productService.listProducts();
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ error: "erro ao listar produtos" });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const idSchema = z.string();
    const validatedId = idSchema.parse(id);

    const produto = await productService.getProduct(validatedId);
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

export const createProduct = async (req: Request, res: Response) => {
  try {
    const validatedData = productSchema.parse(req.body);

    const novoProduto = await productService.createProduct(validatedData);
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

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idSchema = z.string();
    const validatedId = idSchema.parse(id);

    await productService.deleteProduct(validatedId);
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

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idSchema = z.string();
    const validatedId = idSchema.parse(id);

    const validatedData = productSchema.partial().parse(req.body);

    const produtoAtualizado = await productService.updateProduct(
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
