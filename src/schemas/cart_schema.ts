import { z } from "zod";

export const CartItemSchema = z.object({
  _id: z.string().nonempty("O ID do produto é obrigatório"),
  name: z.string().nonempty("O nome do produto é obrigatório"),
  qtdProduct: z.number().int().min(1, "A quantidade deve ser no mínimo 1"),
  price: z.number().min(0, "O preço deve ser no mínimo 0"),
  image: z.string().nonempty("A URL da imagem é obrigatória"),
  description: z.string().nonempty("A descrição do produto é obrigatória"),
  stock: z.number().min(0, "O estoque deve ser no mínimo 0"),
  updatedAt: z.date().optional(),
});

export const CartSchema = z.object({
  userId: z.string().nonempty("O ID do usuário é obrigatório"),
  items: z.array(CartItemSchema),
});

export type CartItem = z.infer<typeof CartItemSchema>;
export type Cart = z.infer<typeof CartSchema>;
