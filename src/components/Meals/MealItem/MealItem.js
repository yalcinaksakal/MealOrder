import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
const MealItem = props => {
  const price = `€${props.meal.price.toFixed(2)}`;
  const imgSrc = require(`../../../assests/products/${props.meal.img}`).default;

  const addToCartHandler = amount => {};
  return (
    <li className={styles.meal}>
      <div className={styles.text}>
        <h3>{props.meal.name}</h3>

        {props.meal.description ? (
          <div className={styles.description}>{props.meal.description}</div>
        ) : null}
        <div className={styles.price}>{price}</div>
        <MealItemForm onAdToChart={addToCartHandler} />
      </div>

      <img src={imgSrc} alt={props.meal.name} />
    </li>
  );
};

export default MealItem;
