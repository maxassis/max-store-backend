import mongoose, { Document, Schema } from "mongoose";

export interface IProduto extends Document {
  name: string;
  description: string;
  qtdProduct: number;
  createdAt: Date;
}

const produtoSchema = new Schema<IProduto>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  qtdProduct: {
    type: Number,
    required: true,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Produto = mongoose.model<IProduto>("Produto", produtoSchema);

export default Produto;
