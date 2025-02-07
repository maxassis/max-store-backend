import mongoose from "mongoose";
import Produto from "./src/models/product";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
console.log(MONGODB_URI);

const produtos = [
  {
    name: "Tablet Air",
    price: 400,
    description:
      "Tablet leve e potente com tela de retina e suporte a caneta digital.",
    image:
      "https://yellow-fascinating-badger-992.mypinata.cloud/ipfs/bafkreibbibk4gsdpalapcmm4tctuj3ctonrvdd3m23qwvrtdsxtrh22na4",
  },
  {
    name: "PlayStation 5",
    price: 500,
    description: "Console de últimas geração com graficos em 4k e ray tracing.",
    image:
      "https://yellow-fascinating-badger-992.mypinata.cloud/ipfs/bafkreihuq6wr2bzfgcmevrimummisdvstwq5mvj7jmkrav2zntwtsdfdai",
  },
  {
    name: "Notebook Asus",
    price: 600,
    description:
      "Notebook premium com processador de ultima geração e design elegante.",
    image:
      "https://yellow-fascinating-badger-992.mypinata.cloud/ipfs/bafkreideyi4vg27t3vymjd3go5e5d2jyfg2fz5etuivoqbueybmbsbpwl4",
  },
  {
    name: "Camera Canon",
    price: 700,
    description: "Câmera profissional com sensor full-frame e gravação 4k.",
    image:
      "https://yellow-fascinating-badger-992.mypinata.cloud/ipfs/bafkreid4i5d53r63v55z6yt53idkrdxlatdulag3hupaludufvbfe3tseq",
  },
  {
    name: "HeadPhone",
    price: 800,
    description: "Fones de ouvido sem fio com cancelamento de ruído ativo.",
    image:
      "https://yellow-fascinating-badger-992.mypinata.cloud/ipfs/bafkreicfoztp77v4htutmui5fdoisy2ealdphlgpw4munsp6kaoldnxvyi",
  },
  {
    name: "Iphone 16",
    price: 500,
    description:
      "Smartphone premium com camera de alta qualidade e bateria de longa duração.",
    image:
      "https://yellow-fascinating-badger-992.mypinata.cloud/ipfs/bafkreid2uhtidirzbeokrsss5b4etk4ikgqhlspfo4z32eknfkt25n553u",
  },
  {
    name: "Smart Watch",
    price: 1000,
    description:
      "Relógio inteligente com monitoramento de saúde e GPS integrado.",
    image:
      "https://yellow-fascinating-badger-992.mypinata.cloud/ipfs/bafkreifrfvmf4lwb6mv3fjxpn6kag3ahrtfo3uki4ava4kvkxefrn3zwmu",
  },
  {
    name: "Macbook Air M3",
    price: 1500,
    description:
      "Notebook premium com processador de ultima geração e design elegante.",
    image:
      "https://yellow-fascinating-badger-992.mypinata.cloud/ipfs/bafkreieigc5xnr2gfrotcx3vuahhwtcpqutymenc6w6vgssv7vuit2mpza",
  },
  {
    name: "Caixa de som",
    price: 200,
    description:
      "Caixa de som portatil com conexão Bluetooth e bateria de longa duração",
    image:
      "https://yellow-fascinating-badger-992.mypinata.cloud/ipfs/bafkreicefwc6wv5lik2ys2sfjjekivtr2szjzxhzrqmhpz6d2mnn2gspvu",
  },
  {
    name: "Mouse Gamer Logitech",
    price: 450,
    description:
      "Mouse gamer com sensor optico de alta precisão e botões programaveis.",
    image:
      "https://yellow-fascinating-badger-992.mypinata.cloud/ipfs/bafkreihlaxmqloqef6u3mzgnogxiw3nq3z2uqe4op2k5qwqfpwszvozv5y",
  },
  {
    name: "Teclado mecanico Corsair",
    price: 1100,
    description:
      "Teclado mecanico com switches mecânicos e iluminação RGB personalizavel.",
    image:
      "https://yellow-fascinating-badger-992.mypinata.cloud/ipfs/bafkreieuaopyecfs6ucypri6k5itofcpkqm37efvmwtww2ycxys46nfyim",
  },
];

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
