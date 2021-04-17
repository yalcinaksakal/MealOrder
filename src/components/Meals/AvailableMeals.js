import styles from "./AvailableMeals.module.css";
import products from "../../assests/products/products";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
const AvailableMeals = () => {
  const mealsList = products.map((meal, i) => {
    meal.id = "m" + i;
    return <MealItem key={meal.id} meal={meal} />;
  });
  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
