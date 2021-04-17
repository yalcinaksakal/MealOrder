import CartContext from "./cart-context";

const CardProvider = props => {
  const addItemToCartHandler = item => {};
  const removeItemFromCartHandler = item => {};
  const cartContext = {
    items: [],
    totalAmount: 0,
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