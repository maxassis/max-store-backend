import mongoose from "mongoose";
import Produto from "./src/models/product";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const produtos = [
  {
    name: "Produto 1",
    description: "Descrição do Produto 1",
    qtdProduct: 10,
  },
  {
    name: "Produto 2",
    description: "Descrição do Produto 2",
    qtdProduct: 5,
  },
  {
    name: "Produto 3",
    description: "Descrição do Produto 3",
    qtdProduct: 20,
  },
];

// Conectando ao MongoDB
mongoose
  .connect(MONGODB_URI || "")
  .then(() => {
    console.log("Conexão com o MongoDB estabelecida.");
    return Produto.deleteMany({});
  })
  .then(() => {
    return Produto.insertMany(produtos);
  })
  .then(() => {
    console.log("Produtos inseridos com sucesso!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Erro ao popular o banco de dados:", err);
    mongoose.connection.close();
  });
