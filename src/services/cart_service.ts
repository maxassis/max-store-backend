import Cart, { CartItem } from "../models/cart";
class CartService {
  async updateOrCreateCart(userId: string, items: CartItem[]) {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      const newCart = new Cart({ userId, items });
      return await newCart.save();
    }

    cart.items = items;

    cart.items = cart.items.filter((item) => item.qtdProduct > 0);

    return await cart.save();
  }
}

export default new CartService();
