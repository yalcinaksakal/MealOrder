import styles from "./ButtonCart.module.css";
import CartIcon from "../Cart/CartIcon";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";

const ButtonCart = props => {
  const ctx = useContext(CartContext);
  const { items } = ctx;
  const numberOfCartItems = items.reduce((cur, item) => cur + item.amount, 0);
  const [buttonBump, setButtonBump] = useState(false);

  useEffect(() => {
    if (!items.length) return;
    setButtonBump(true);
    const bumpTimer = setTimeout(() => setButtonBump(false), 300);
    return () => clearTimeout(bumpTimer);
  }, [items]);

  const btnClasses = `${styles.button} ${buttonBump ? styles.bump : ""}`;

  return (
    <button className={btnClasses} onClick={props.clicked}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <div className={`${styles.badge} ${ctx.totalAmount ? styles.full : ""}`}>
        {ctx.totalAmount > 0 && <div className={styles.rotator}></div>}
        <span>{numberOfCartItems}</span>
      </div>
    </button>
  );
};
export default ButtonCart;
