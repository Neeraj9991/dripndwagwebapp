import { create } from "zustand";
import { currentCart } from "@wix/ecom";
import { WixClient } from "@/context/wixContext";

type Cart = currentCart.Cart | null;

type CartState = {
  cart: Cart;
  isLoading: boolean;
  counter: number;
  getCart: (wixClient: WixClient) => Promise<void>;
  addItem: (
    wixClient: WixClient,
    productId: string,
    variantId: string,
    quantity: number
  ) => Promise<void>;
  removeItem: (wixClient: WixClient, itemId: string) => Promise<void>;
};

export const useCartStore = create<CartState>((set) => ({
  cart: null,
  isLoading: false,
  counter: 0,

  getCart: async (wixClient) => {
    set({ isLoading: true });
    try {
      const cart = await wixClient.currentCart.getCurrentCart();
      set({
        cart,
        counter: cart?.lineItems?.length || 0,
        isLoading: false,
      });
    } catch (error) {
      console.error("❌ Failed to fetch cart:", error);
      set({ isLoading: false });
    }
  },

  addItem: async (wixClient, productId, variantId, quantity) => {
    set({ isLoading: true });

    try {
      const response = await wixClient.currentCart.addToCurrentCart({
        lineItems: [
          {
            catalogReference: {
              appId: process.env.NEXT_PUBLIC_WIX_APP_ID!,
              catalogItemId: productId,
              ...(variantId && { options: { variantId } }),
            },
            quantity,
          },
        ],
      });

      set({
        cart: response.cart,
        counter: response.cart?.lineItems?.length || 0,
        isLoading: false,
      });
    } catch (error) {
      console.error("❌ Failed to add item:", error);
      set({ isLoading: false });
    }
  },

  removeItem: async (wixClient, itemId) => {
    set({ isLoading: true });

    try {
      const response =
        await wixClient.currentCart.removeLineItemsFromCurrentCart([itemId]);

      set({
        cart: response.cart,
        counter: response.cart?.lineItems?.length || 0,
        isLoading: false,
      });
    } catch (error) {
      console.error("❌ Failed to remove item:", error);
      set({ isLoading: false });
    }
  },
}));
