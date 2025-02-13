import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "O nome do produto é obrigatório."),
  description: z.string().min(1, "A descrição do produto é obrigatória."),
  price: z.number().min(0, "O preço do produto não pode ser negativo."),
  image: z.string().url("A imagem do produto deve ser uma URL válida."),
  stock: z
    .number()
    .min(0, "O estoque do produto deve ser maior ou igual a zero."),
});
