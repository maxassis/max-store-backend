import mongoose, { Document, Schema } from "mongoose";

export interface CartItem {
  _id: string;
  name: string;
  qtdProduct: number;
  price: number;
  image: string;
  description: string;
  stock: number;
  updatedAt: Date;
}

export interface Cart extends Document {
  userId: string;
  items: CartItem[];
}

const cartSchema = new Schema<Cart>({
  userId: {
    type: String,
    required: true,
  },
  items: [
    {
      _id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      qtdProduct: {
        type: Number,
        required: true,
        min: 1,
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
      description: {
        type: String,
        required: true,
      },
      stock: {
        type: Number,
        required: true,
        min: 0,
      },
      updatedAt: {
        type: Date,
        default: Date.now, // Define a data atual como valor padrão
      },
    },
  ],
});

// Modelo do carrinho
const CartModel = mongoose.model<Cart>("Cart", cartSchema);

export default CartModel;
