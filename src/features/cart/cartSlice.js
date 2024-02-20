import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      //payload = new cart
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      //payload = pizza id
      state.cart = state.cart.filter(
        (cartObj) => cartObj.pizzaId !== action.payload,
      );
    },
    increaseItemQuantity(state, action) {
      //payload = pizza id
      const item = state.cart.find(
        (cartObj) => cartObj.pizzaId === action.payload,
      );
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      //payload = pizza id
      const item = state.cart.find(
        (cartObj) => cartObj.pizzaId === action.payload,
      );
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      if (item.quantity === 0)
        state.cart = state.cart.filter(
          (cartObj) => cartObj.pizzaId !== action.payload,
        );
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCart = (state) => state.cart.cart;

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((cartObj) => cartObj.pizzaId === id)?.quantity ?? 0;
