import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: any, action: any) => {
      console.log(action.payload);
      const id = action.payload.payload.product_code;
      //console.log(state);

      if (state.items[id]) {
        state.items[id].quantity += 1;
      } else {
        state.items[id] = { ...action.payload.payload, quantity: 1 };
      }
    },
    removeFromCart: (state: any, action: any) => {
      const id = action.payload.payload.product_code;
      if (state.items[id].quantity === 1) {
        delete state.items[action.payload.payload.product_code];
      } else {
        state.items[id].quantity -= 1;
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
