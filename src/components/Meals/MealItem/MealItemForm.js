import styles from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef, useState } from "react";

const MealItemForm = props => {
  const inputRef = useRef();
  const [isAmountValid, setIsAmountValid] = useState(true);
  const submitHandler = e => {
    e.preventDefault();
    const enteredAmount = inputRef.current.value;
    if (
      enteredAmount.trim().length === 0 ||
      +enteredAmount < 1 ||
      +enteredAmount > 9
    ) {
      setIsAmountValid(false);
      return;
    }

    props.onAdToChart(+enteredAmount);
  };
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={inputRef}
        label="Amount"
        input={{
          id: "amount",
          type: "number",
          min: "1",
          max: "9",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!isAmountValid && <p>Please enter a valid amount (1-9)</p>}
    </form>
  );
};

export default MealItemForm;
