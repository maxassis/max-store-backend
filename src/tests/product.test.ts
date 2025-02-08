import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import request from "supertest";
import { app } from "../index"; // Importe o app Express
import mongoose from "mongoose";

describe("ProdutoController", () => {
  beforeAll(async () => {
    // Conecte-se ao banco de dados de teste (apenas uma vez)
    if (mongoose.connection.readyState === 0) {
      // Verifica se já está conectado
      await mongoose.connect("mongodb://localhost:27017/testdb");
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Limpe o banco de dados antes de cada teste
    if (mongoose.connection.db) {
      await mongoose.connection.db.dropDatabase();
    }
  });

  it("deve listar todos os produtos em estoque", async () => {
    const response = await request(app).get("/produtos");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]); // Espera uma lista vazia inicialmente
  });

  it("deve criar um novo produto", async () => {
    const novoProduto = {
      name: "Novo Produto",
      description: "novo2",
      price: 1000,
      image: "http://www.google.com.br",
      stock: 15,
    };

    const response = await request(app).post("/produtos").send(novoProduto);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Novo Produto");
  });
});
