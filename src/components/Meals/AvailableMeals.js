import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import { useEffect, useState } from "react";
import Spinner from "../UI/Spinner";
const AvailableMeals = () => {
  //mealsList= spinner,error or meals list
  const [mealsList, setMealsList] = useState(<Spinner />);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://order-meal-a2f7a-default-rtdb.firebaseio.com/meals/-MZ9QVLnro9jipm5VE1u.json"
      );
      const data = await response.json();
      if (!data) throw new Error("Couldn't get meals from server.");
      setMealsList(
        <section className={styles.meals}>
          <Card>
            <ul>
              {Object.values(data).map(meal => (
                <MealItem key={meal.id} meal={meal} />
              ))}
            </ul>
          </Card>
        </section>
      );
    };

    fetchMeals().catch(error => {
      setMealsList(<p className={styles.error}>{error.message}</p>);
    });
  }, []);
  return mealsList;
};

export default AvailableMeals;
