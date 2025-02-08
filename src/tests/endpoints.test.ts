import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import request from "supertest";
import { app, connectToDatabase } from "../index";
import mongoose from "mongoose";
import Cart from "../models/cart";
import Produto from "../models/product";

describe("Teste do ProdutoController e CartController", () => {
  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await connectToDatabase();
      console.log("Conectado ao banco de dados de teste");
    }
  });

  // Desconexão do banco de dados após todos os testes
  afterAll(async () => {
    await mongoose.connection.close();
    console.log("Desconectado do banco de dados de teste");
  });

  // Limpeza do banco de dados antes de cada teste
  beforeEach(async () => {
    if (mongoose.connection.db) {
      await mongoose.connection.db.dropDatabase();
      console.log("Banco de dados limpo");
    }
  });

  // Testes dos endpoints de Produtos
  describe("ProdutoController", () => {
    it("deve listar todos os produtos em estoque", async () => {
      const response = await request(app).get("/produtos");
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it("deve criar um novo produto", async () => {
      const novoProduto = {
        name: "Novo Produto",
        description: "Descrição do Novo Produto",
        price: 150,
        stock: 20,
        image: "https://example.com/image.jpg",
      };
      const response = await request(app).post("/produtos").send(novoProduto);
      expect(response.status).toBe(201);
      expect(response.body.name).toBe("Novo Produto");
    });

    it("deve deletar um produto existente", async () => {
      const novoProduto = {
        name: "Produto para Deletar",
        description: "Descrição do Produto",
        price: 100,
        stock: 10,
        image: "https://example.com/image.jpg",
      };
      const produtoCriado = await request(app)
        .post("/produtos")
        .send(novoProduto);

      const response = await request(app).delete(
        `/produtos/${produtoCriado.body._id}`
      );

      expect(response.status).toBe(204);

      // Verifica se o produto foi removido do banco de dados
      const produtoDeletado = await Produto.findById(produtoCriado.body._id);
      expect(produtoDeletado).toBeNull();
    });
  });

  // Testes do endpoint de Cart
  describe("CartController - Criação do Carrinho de um usuario", () => {
    it("deve criar um novo carrinho via requisição POST", async () => {
      const userId = "user123";
      const items = [
        {
          _id: "prod1",
          name: "Produto 1",
          qtdProduct: 2,
          price: 100,
          image: "imagem1.jpg",
          description: "Descrição do Produto 1",
          stock: 10,
        },
      ];
      const response = await request(app).post("/cart").send({ userId, items });
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Carrinho atualizado com sucesso");

      const cart = await Cart.findOne({ userId });
      expect(cart).toBeDefined();
      expect(cart?.userId).toBe(userId);
      expect(cart?.items).toHaveLength(1);
      expect(cart?.items[0].name).toBe("Produto 1");
    });
  });
});
