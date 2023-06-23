import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartProduct extends Product {
  quantity: number;
}

// Define the interface of the Cart state
interface State {
  cart: CartProduct[];
  totalItems: number;
  totalPrice: number;
}

// Define the interface of the actions that can be performed in the Cart
interface Actions {
  addToCart: (Item: Product) => void;
  removeFromCart: (Item: CartProduct) => void;
  decreaseCart: (Item: Product) => void;
}

// Initialize a default state
const INITIAL_STATE: State = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
};

// Create the store with Zustand, combining the status interface and actions
export const useCartStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      cart: INITIAL_STATE.cart,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,
      decreaseCart(product) {
        const cart = get().cart;
        const cartItem = cart.find((item) => item._id === product._id);

        // If the item already exists in the Cart, increase its quantity
        if (cartItem) {
          const updatedCart = cart.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems - 1,
            totalPrice: state.totalPrice - product.price,
          }));
        } 
      },
      addToCart: (product) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item._id === product._id);

        // If the item already exists in the Cart, increase its quantity
        if (cartItem) {
          const updatedCart = cart.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + product.price,
          }));
        } else {
          const updatedCart = [...cart, { ...product, quantity: 1 }];

          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + product.price,
          }));
        }
      },
      removeFromCart: (product) => {
        set((state) => ({
          cart: state.cart.filter((item) => item._id !== product._id),
          totalItems: state.totalItems - product.quantity,
          totalPrice: state.totalPrice - (product.price * product.quantity)
        }));
      },
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
