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

mongoose
  .connect(process.env.MONGODB_URI || "")
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
