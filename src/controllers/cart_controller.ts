import { Request, Response } from "express";
import { CartSchema } from "../schemas/cart_schema"; // Importa o schema Zod
import { ZodError } from "zod"; // Importa o tipo ZodError
import CartService from "../services/cart_service";

export const updateOrCreateCart = async (req: Request, res: Response) => {
  try {
    const validatedData = CartSchema.parse(req.body);

    const { userId, items } = validatedData;

    const cart = await CartService.updateOrCreateCart(userId, items);

    return res
      .status(200)
      .json({ message: "Carrinho atualizado com sucesso", data: cart });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Erro de validação dos dados",
        errors: error.errors.map((err) => ({
          campo: err.path.join("."),
          mensagem: err.message,
        })),
      });
    }

    return res
      .status(500)
      .json({ message: "Erro interno ao processar o carrinho" });
  }
};
