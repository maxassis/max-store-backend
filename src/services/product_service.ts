import NodeCache from "node-cache";
import Product from "../models/product";
import { deleteProduct } from "../controllers/product_controller";

export interface IProdutoInput {
  name: string;
  description: string;
  image: string;
  price: number;
  stock: number;
}

const cache = new NodeCache({ stdTTL: 600 });

class ProductService {
  async listProducts() {
    const cacheKey = "lista_produtos";

    try {
      const cachedData = cache.get(cacheKey);
      if (cachedData) {
        return cachedData;
      }

      const produtos = await Product.find({ stock: { $gt: 0 } });

      cache.set(cacheKey, produtos);

      return produtos;
    } catch (error) {
      throw new Error("Erro ao listar produtos");
    }
  }

  async getProduct(id: string) {
    const cacheKey = `produto_${id}`;

    try {
      const cachedData = cache.get(cacheKey);
      if (cachedData) {
        return cachedData;
      }

      const produto = await Product.findById(id);

      if (!produto) {
        throw new Error("Produto não encontrado");
      }

      cache.set(cacheKey, produto);

      return produto;
    } catch (error) {
      throw new Error("Erro ao obter produto");
    }
  }

  async createProduct(dados: IProdutoInput) {
    try {
      const { name, description, image, price, stock } = dados;

      const novoProduto = new Product({
        name,
        description,
        image,
        price,
        stock,
      });
      await novoProduto.save();

      cache.del("lista_produtos");

      return novoProduto;
    } catch (error) {
      throw new Error("Erro ao criar produto");
    }
  }

  async updateProduct(id: string, dados: Partial<IProdutoInput>) {
    try {
      const produtoAtualizado = await Product.findByIdAndUpdate(id, dados, {
        new: true,
      });

      if (!produtoAtualizado) {
        throw new Error("Produto não encontrado");
      }

      cache.del("lista_produtos");

      return produtoAtualizado;
    } catch (error) {
      throw new Error("Erro ao atualizar produto");
    }
  }

  async deleteProduct(id: string) {
    try {
      const produtoExcluido = await Product.findByIdAndDelete(id);

      if (!produtoExcluido) {
        throw new Error("Produto não encontrado");
      }

      cache.del("lista_produtos");

      return { message: "Produto excluído com sucesso" };
    } catch (error) {
      throw new Error("Erro ao excluir produto");
    }
  }
}

export default new ProductService();
