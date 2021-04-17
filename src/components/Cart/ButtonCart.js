import styles from "./ButtonCart.module.css";
import CartIcon from "../Cart/CartIcon";
import { useContext } from "react";
import CartContext from "../../store/cart-context";

const ButtonCart = props => {
  const ctx = useContext(CartContext);
  return (
    <button className={styles.button} onClick={props.clicked}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{ctx.items.length}</span>
    </button>
  );
};
export default ButtonCart;
