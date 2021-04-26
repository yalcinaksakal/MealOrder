import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import { useContext, useState } from "react";
import Checkout from "./Checkout";
const Cart = props => {
  const ctx = useContext(CartContext);
  const totalAmount = `€ ${ctx.totalAmount.toFixed(2)}`;
  const hasItems = ctx.items.length > 0;

  const cartItemRemoveHandler = item => {
    const singleItem = { ...item, amount: 1 };
    ctx.removeItem(singleItem);
  };
  const cartItemAddHandler = item => {
    const singleItem = { ...item, amount: 1 };
    ctx.addItem(singleItem);
  };
  const cartItemDeleteHandler = item => {
    ctx.deleteItem(item);
  };

  const [isCheckout, setIsCheckout] = useState(false);
  const orderHandler = () => {
    setIsCheckout(true);
  };
  const cartItems = (
    <ul>
      {ctx.items.map(item => (
        <CartItem
          key={item.id}
          {...item}
          onRemove={cartItemRemoveHandler.bind(null, item)}
          onAdd={cartItemAddHandler.bind(null, item)}
          onDelete={cartItemDeleteHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const modalActions = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  return (
    <Modal onClose={props.onClose}>
      <div className={styles["cart-items"]}>{cartItems}</div>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && ctx.totalAmount !== 0 ? (
        <Checkout onCancel={props.onClose} />
      ) : (
        modalActions
      )}
    </Modal>
  );
};
export default Cart;
