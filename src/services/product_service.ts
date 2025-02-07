import Produto from "../models/product";

export interface IProdutoInput {
  name: string;
  description: string;
  image: string;
  price: number;
}

class ProdutoService {
  // Listar todos os produtos em estoque
  async listarProdutos() {
    try {
      const produtos = await Produto.find({ stock: { $gt: 0 } });
      return produtos;
    } catch (error) {
      throw new Error("Erro ao listar produtos");
    }
  }

  // retornar um unico produto
  async obterProduto(id: string) {
    try {
      const produto = await Produto.findById(id);
      return produto;
    } catch (error) {
      throw new Error("Erro ao obter produto");
    }
  }

  //  Criar um novo produto
  async criarProduto(dados: IProdutoInput) {
    try {
      const { name, description, image, price } = dados;

      const novoProduto = new Produto({
        name,
        description,
        image,
        price,
      });
      await novoProduto.save();
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

      return { message: "Produto excluído com sucesso" };
    } catch (error) {
      throw new Error("Erro ao excluir produto");
    }
  }
}

export default new ProdutoService();
