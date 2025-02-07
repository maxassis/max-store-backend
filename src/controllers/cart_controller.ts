import { Request, Response } from "express";
import CartService from "../services/cart_service";

export const updateOrCreateCart = async (req: Request, res: Response) => {
  try {
    const { userId, items } = req.body;

    const cart = await CartService.updateOrCreateCart(userId, items);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar ou criar carrinho" });
  }
};
