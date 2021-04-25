import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import { useEffect, useState } from "react";
import Spinner from "../UI/Spinner";
const AvailableMeals = () => {
  const [mealsList, setMealsList] = useState(<Spinner />);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://order-meal-a2f7a-default-rtdb.firebaseio.com/meals/-MZ9QVLnro9jipm5VE1u.json"
      );
      const data = await response.json();
      setMealsList(
        <ul>
          {Object.values(data).map(meal => (
            <MealItem key={meal.id} meal={meal} />
          ))}
        </ul>
      );
    };
    fetchMeals();
  }, []);
  return (
    <section className={styles.meals}>
      <Card>{mealsList}</Card>
    </section>
  );
};

export default AvailableMeals;
