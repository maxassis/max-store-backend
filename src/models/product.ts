import mongoose, { Document, Schema } from "mongoose";

export interface IProduto extends Document {
  name: string;
  description: string;
  createdAt: Date;
  price: number;
  image: string;
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
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Produto = mongoose.model<IProduto>("Produto", produtoSchema);

export default Produto;
