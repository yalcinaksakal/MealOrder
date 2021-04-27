import { useRef, useState } from "react";
import styles from "./Checkout.module.css";

const isEmpty = value => value.trim() === "";
const isFiveChars = value => value.trim().length === 5;

const Checkout = props => {
  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();

  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const confirmHandler = e => {
    e.preventDefault();
    const name = nameRef.current.value;
    const street = streetRef.current.value;
    const postal = postalRef.current.value;
    const city = cityRef.current.value;

    const isFormValid = {
      name: !isEmpty(name),
      street: !isEmpty(street),
      postal: isFiveChars(postal),
      city: !isEmpty(city),
    };
    setFormValidity(isFormValid);

    if (Object.values(isFormValid).some(value => value === false)) return;

    props.onConfirm({ name, street, postal, city });
  };

  return (
    <form onSubmit={confirmHandler} className={styles.form}>
      <div
        className={`${styles.control} ${
          formValidity.name ? "" : styles.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef} />
      </div>
      <div
        className={`${styles.control} ${
          formValidity.street ? "" : styles.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input ref={streetRef} type="text" id="street" />
      </div>
      <div
        className={`${styles.control} ${
          formValidity.postal ? "" : styles.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input type="text" ref={postalRef} id="postal" />
      </div>
      <div
        className={`${styles.control} ${
          formValidity.city ? "" : styles.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" ref={cityRef} id="city" />
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};
export default Checkout;
