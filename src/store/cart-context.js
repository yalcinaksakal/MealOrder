import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: item => {},
  removeItem: item => {},
  deleteItem: item => {},
});

export default CartContext;
