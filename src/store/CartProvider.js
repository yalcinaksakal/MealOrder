import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = { items: [], totalAmount: 0 };

const cardReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedItems = state.items.concat(action.item);
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }
  if (action.type === "REMOVE") {
  }
  return defaultCartState;
};

const CardProvider = props => {
  const [cartState, dispatchCart] = useReducer(cardReducer, defaultCartState);

  const addItemToCartHandler = item => {
    dispatchCart({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = item => {
    dispatchCart({ type: "REMOVE", item: item });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CardProvider;
