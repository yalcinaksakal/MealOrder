import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = { items: [], totalAmount: 0 };

const newStateHandler = (state, action) => {
  const operationType = action.type === "ADD" ? 1 : -1;
  const updatedTotalAmount =
    state.totalAmount + action.item.price * action.item.amount * operationType;
  const existingCartItemIndex = state.items.findIndex(
    item => item.id === action.item.id
  );
  let updatedItems;
  if (existingCartItemIndex !== -1) {
    const existingItem = state.items[existingCartItemIndex];
    const updatedItem = {
      ...existingItem,
      amount: existingItem.amount + action.item.amount * operationType,
    };
    updatedItems = [...state.items];
    updatedItems[existingCartItemIndex] = updatedItem;
    if (updatedItem.amount < 1)
      updatedItems = state.items.filter(item => item.id !== updatedItem.id);
  } else updatedItems = state.items.concat(action.item);
  return { items: updatedItems, totalAmount: updatedTotalAmount };
};

const cardReducer = (state, action) => {
  if (action.type === "ADD" || action.type === "REMOVE") {
    return newStateHandler(state, action);
  }
  if (action.type === "DELETE") {
    const updatedItems = state.items.filter(item => item.id !== action.item.id);
    const updatedTotalAmount =
      state.totalAmount - action.item.price * action.item.amount;
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }
  if (action.type === "CLEAR") return defaultCartState;
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
  const deleteItemFromCartHandler = item => {
    dispatchCart({ type: "DELETE", item: item });
  };

  const clearChartHandler = () => {
    dispatchCart({ type: "CLEAR" });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    deleteItem: deleteItemFromCartHandler,
    clearChart: clearChartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CardProvider;
