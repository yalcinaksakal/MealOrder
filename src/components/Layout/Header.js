import CartButton from "../Cart/ButtonCart";
import styles from "./Header.module.css";
import tableImg from "../../assests/other/table.jpg";

const Header = props => {
  return (
    <>
      <header className={styles.header}>
        <h1>Meal Order</h1>
        <CartButton clicked={props.onShowCart} />
      </header>
      <div className={styles["main-image"]}>
        <img src={tableImg} alt="A table full of delicious food." />
      </div>
    </>
  );
};
export default Header;
