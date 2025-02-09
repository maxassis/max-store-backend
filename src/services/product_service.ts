import NodeCache from "node-cache";
import Produto from "../models/product";

export interface IProdutoInput {
  name: string;
  description: string;
  image: string;
  price: number;
  stock: number;
}

const cache = new NodeCache({ stdTTL: 600 });

class ProdutoService {
  // Listar todos os produtos em estoque
  async listarProdutos() {
    const cacheKey = "lista_produtos";

    try {
      const cachedData = cache.get(cacheKey);
      if (cachedData) {
        // console.log("Retornando lista de produtos do cache");
        return cachedData;
      }

      // console.log("Buscando lista de produtos no banco de dados...");

      const produtos = await Produto.find({ stock: { $gt: 0 } });

      cache.set(cacheKey, produtos);

      return produtos;
    } catch (error) {
      throw new Error("Erro ao listar produtos");
    }
  }

  // Retornar um único produto
  async obterProduto(id: string) {
    const cacheKey = `produto_${id}`;

    try {
      // Verifica se o produto já está em cache
      const cachedData = cache.get(cacheKey);
      if (cachedData) {
        // console.log(`Retornando produto ${id} do cache`);
        return cachedData;
      }

      // console.log(`Buscando produto ${id} no banco de dados...`);

      const produto = await Produto.findById(id);

      if (!produto) {
        throw new Error("Produto não encontrado");
      }

      cache.set(cacheKey, produto);

      return produto;
    } catch (error) {
      throw new Error("Erro ao obter produto");
    }
  }

  // Criar um novo produto
  async criarProduto(dados: IProdutoInput) {
    try {
      const { name, description, image, price, stock } = dados;

      const novoProduto = new Produto({
        name,
        description,
        image,
        price,
        stock,
      });
      await novoProduto.save();

      // Limpa o cache da lista de produtos, pois um novo produto foi adicionado
      cache.del("lista_produtos");

      return novoProduto;
    } catch (error) {
      throw new Error("Erro ao criar produto");
    }
  }

  // Atualizar um produto por ID
  async atualizarProduto(id: string, dados: Partial<IProdutoInput>) {
    try {
      const produtoAtualizado = await Produto.findByIdAndUpdate(id, dados, {
        new: true,
      });

      if (!produtoAtualizado) {
        throw new Error("Produto não encontrado");
      }

      // Limpa o cache da lista de produtos, pois um produto foi atualizado
      cache.del("lista_produtos");

      return produtoAtualizado;
    } catch (error) {
      throw new Error("Erro ao atualizar produto");
    }
  }

  // Excluir um produto por ID
  async excluirProduto(id: string) {
    try {
      const produtoExcluido = await Produto.findByIdAndDelete(id);

      if (!produtoExcluido) {
        throw new Error("Produto não encontrado");
      }

      // Limpa o cache da lista de produtos, pois um produto foi excluído
      cache.del("lista_produtos");

      return { message: "Produto excluído com sucesso" };
    } catch (error) {
      throw new Error("Erro ao excluir produto");
    }
  }
}

export default new ProdutoService();
