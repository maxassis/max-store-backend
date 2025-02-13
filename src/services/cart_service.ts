import CartModel, { CartItem } from "../models/cart";
import Produto from "../models/product";

class CartService {
  async updateOrCreateCart(userId: string, items: CartItem[]) {
    const productIds = items.map((item) => item._id);
    const products: CartItem[] = await Produto.find({
      _id: { $in: productIds },
    });

    for (const item of items) {
      const product = products.find((p) => p._id.toString() === item._id);

      if (!product) {
        throw new Error("Produto não encontrado");
      }

      if (product.stock < item.qtdProduct) {
        throw new Error("Estoque insuficiente");
      }
    }

    let cart = await CartModel.findOne({ userId });

    if (!cart) {
      const newCart = new CartModel({ userId, items });
      return await newCart.save();
    }

    cart.items = items.filter((item) => item.qtdProduct > 0);
    return await cart.save();
  }
}

export default new CartService();
