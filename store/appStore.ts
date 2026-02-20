import { create } from "zustand";
import type { Post } from "@/types/type";
import { persist } from "zustand/middleware";

interface CartItem extends Post {
  quantity: number;
}

interface APPSTORE {
  menuOpen: boolean;
  toggleMenu: () => void;
  cartOpen: boolean;
  toggleCart: () => void;
  cart: CartItem[];
  addToCart: (product: Post) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

//Persist here is used to store to local storage whether the menu and cart are open or not, so that if the user refreshes the page, the state is preserved.

export const appStore = create<APPSTORE>()(
  persist(
    (set) => ({
      menuOpen: false,
      toggleMenu: () => set((state) => ({ menuOpen: !state.menuOpen })),
      cartOpen: false,
      toggleCart: () => set((state) => ({ cartOpen: !state.cartOpen })),
      cart: [],
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item._id === product._id,
          );
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item._id !== productId),
        })),
      updateCartQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item._id === productId ? { ...item, quantity } : item,
          ),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "app-store",
    },
  ),
);
