import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
const Cart = props => {
  const cartItems = (
    <ul>
      {[{ id: 1, name: "kebap", amount: 2, price: 14 }].map(item => (
        <li>{item.name}</li>
      ))}
    </ul>
  );
  return (
    <Modal>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>€35.00</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]}>Close</button>
        <button className={styles.button}>Order</button>
      </div>
    </Modal>
  );
};
export default Cart;
