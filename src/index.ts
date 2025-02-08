// import "dotenv/config";
// import express from "express";
// import mongoose from "mongoose";
// import bodyParser from "body-parser";
// import produtosRoutes from "./routes/product_routes";
// import cartRouters from "./routes/cart_routes";

// const app = express();
// app.use(bodyParser.json());
// app.use("/produtos", produtosRoutes);
// app.use("/cart", cartRouters);

// async function connectToDatabase() {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI || "");
//     console.log("Conectado ao MongoDB");
//   } catch (error) {
//     console.error("Erro ao conectar ao MongoDB:", error);
//     process.exit(1);
//   }
// }

// export { app, connectToDatabase };

// if (require.main === module) {
//   const PORT = process.env.PORT || 3000;
//   connectToDatabase().then(() => {
//     app.listen(PORT, () => {
//       console.log(`Servidor rodando na porta ${PORT}`);
//     });
//   });
// }

import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import produtosRoutes from "./routes/product_routes";
import cartRouters from "./routes/cart_routes";

const app = express();
app.use(bodyParser.json());
app.use("/produtos", produtosRoutes);
app.use("/cart", cartRouters);

// Função para conectar ao MongoDB
async function connectToDatabase() {
  try {
    const dbURI =
      process.env.NODE_ENV === "test"
        ? "mongodb://localhost:27017/testdb" // Banco de dados para testes
        : process.env.MONGODB_URI || ""; // Banco de dados de desenvolvimento/produção

    await mongoose.connect(dbURI);
    console.log(
      `Conectado ao MongoDB (${process.env.NODE_ENV || "development"})`
    );
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1); // Encerra o processo em caso de erro
  }
}

// Exporta o app e a função connectToDatabase
export { app, connectToDatabase };

// Inicia o servidor apenas quando o arquivo é executado diretamente
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  connectToDatabase().then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  });
}
