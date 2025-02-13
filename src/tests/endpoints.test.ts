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

  afterAll(async () => {
    await mongoose.connection.close();
    console.log("Desconectado do banco de dados de teste");
  });

  beforeEach(async () => {
    if (mongoose.connection.db) {
      await mongoose.connection.db.dropDatabase();
      console.log("Banco de dados limpo");
    }
  });

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

      const produtoDeletado = await Produto.findById(produtoCriado.body._id);
      expect(produtoDeletado).toBeNull();
    });
  });

  describe("Criação do Carrinho de um usuário", () => {
    beforeEach(async () => {
      await Cart.deleteMany({});
      await Produto.deleteMany({});
      console.log("Banco de dados limpo");
    });

    it("deve criar um novo carrinho via requisição POST", async () => {
      const produto = {
        _id: new mongoose.Types.ObjectId(),
        name: "Produto 1",
        price: 100,
        stock: 10,
        image: "https://example.com/image.jpg",
        description: "Descrição do Produto 1",
      };
      await Produto.create(produto);

      const userId = "user123";
      const items = [
        {
          _id: produto._id,
          name: "Produto 1",
          qtdProduct: 2,
          price: 100,
          image: "https://example.com/image.jpg",
          description: "Descrição do Produto 1",
          stock: 10,
        },
      ];

      const response = await request(app).post("/cart").send({ userId, items });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Carrinho atualizado com sucesso");
      expect(response.body.data.userId).toBe(userId);
      expect(response.body.data.items).toHaveLength(1);
      expect(response.body.data.items[0].name).toBe("Produto 1");
    });

    it("deve retornar erro se o produto não existir", async () => {
      const userId = "user123";
      const items = [
        {
          _id: "prod2",
          name: "Produto 2",
          qtdProduct: 1,
          price: 200,
          image: "https://example.com/image.jpg",
          description: "Descrição do Produto 2",
          stock: 5,
        },
      ];

      const response = await request(app).post("/cart").send({ userId, items });

      expect(response.status).toBe(500);
    });

    it("deve retornar erro se o estoque for insuficiente", async () => {
      const produto = {
        _id: new mongoose.Types.ObjectId(),
        name: "Produto 3",
        price: 300,
        stock: 5,
        image: "https://example.com/image.jpg",
        description: "Descrição do Produto 3",
      };
      await Produto.create(produto);

      const userId = "user123";
      const items = [
        {
          _id: produto._id,
          name: "Produto 3",
          qtdProduct: 10,
          price: 300,
          image: "https://example.com/image.jpg",
          description: "Descrição do Produto 3",
          stock: 5,
        },
      ];

      const response = await request(app).post("/cart").send({ userId, items });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Estoque insuficiente");
    });
  });
});
