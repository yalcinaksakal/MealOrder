import styles from "./ButtonCart.module.css";
import CartIcon from "../Cart/CartIcon";
const ButtonCart = props => {
  return (
    <button className={styles.button} onClick={props.clicked}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>3</span>
    </button>
  );
};
export default ButtonCart;
