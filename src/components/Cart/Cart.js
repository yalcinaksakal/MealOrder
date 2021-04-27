import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import { useContext, useState } from "react";
import Checkout from "./Checkout";
import Spinner from "../UI/Spinner";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState("");
  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async userData => {
    setIsSubmitting(true);
    let submitMessage = "Success";
    await fetch(
      "https://order-meal-a2f7a-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({ user: userData, orderedItems: ctx.items }),
      }
    ).catch(() => {
      submitMessage = "Error: please try again.";
    });
    setIsSubmitting(false);
    setSubmitResult(submitMessage);
    if (submitMessage === "Success") ctx.clearChart();
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
  let modal = (
    <Modal onClose={props.onClose}>
      <div className={styles["cart-items"]}>{cartItems}</div>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && ctx.totalAmount !== 0 ? (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      ) : (
        modalActions
      )}
    </Modal>
  );
  if (isSubmitting)
    modal = (
      <Modal>
        <Spinner />
      </Modal>
    );
  if (submitResult)
    modal = (
      <Modal>
        <p
          style={{
            fontWeight: "bold",
            textAlign: "center",
            color: submitResult === "Success" ? "limegreen" : "red",
          }}
        >
          {submitResult}
        </p>
        <div className={styles.actions}>
          <button className={styles.button} onClick={props.onClose}>
            Close
          </button>
        </div>
      </Modal>
    );
  return modal;
};
export default Cart;
